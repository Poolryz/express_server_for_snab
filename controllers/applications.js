import Application from '../models/Application.js';

export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getApplicationById = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: 'Заявка не найдена'
            });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({
            message: 'Ошибка при поиске заявки',
            error: error.message
        });
    }
};

export const createApplication = async (req, res) => {
    try {
        // Валидация данных
        const { title, responsible, status } = req.body;
        if (!title || !responsible || !status) {
            return res.status(400).json({
                error: 'Необходимо указать title, responsible и status'
            });
        }

        // Автоматическая нумерация заявок
        const lastApplication = await Application.findOne().sort({ number: -1 });
        const nextNumber = lastApplication ? lastApplication.number + 1 : 1;

        // Создание заявки
        const newApplication = new Application({
            ...req.body,
            number: nextNumber,
            date: new Date().toISOString()
        });

        const savedApplication = await newApplication.save();

        res.status(201).json({
            message: 'Заявка успешно создана',
            application: savedApplication
        });
    } catch (error) {
        res.status(500).json({
            error: 'Ошибка при создании заявки',
            details: error.message
        });
    }
};
export const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Находим и удаляем саму заявку
        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({
                success: false,
                message: 'Заявка не найдена'
            });
        }

        // // 2. Удаляем связанные файлы (если есть)
        // const relatedFiles = await PdfFile.find({ applicationId: id });

        // if (relatedFiles.length > 0) {
        //     // Удаляем файлы из файловой системы
        //     relatedFiles.forEach(file => {
        //         fs.unlinkSync(file.path); // Удаление физического файла
        //     });

        //     // Удаляем записи из MongoDB
        //     await PdfFile.deleteMany({ applicationId: id });
        // }

        res.status(200).json({
            success: true,
            message: 'Заявка и связанные файлы успешно удалены',
            deletedApplication
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при удалении заявки',
            error: error.message
        });
    }
};