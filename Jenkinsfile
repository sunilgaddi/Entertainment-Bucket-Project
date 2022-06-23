pipeline {
    agent any
    
    tools {nodejs "node"}
    
    stages {
        stage('Installing Dependencies') {
            steps {
                echo "========== INSTALLING DEPENDENCIES STARTED =========="
                sh "npm install"
                dir('client') {
                    sh "dir"
                    sh "rm -rf node_modules package-lock.json"
                    sh 'npm install'
                    sh 'npm run build'
                }
                echo "========== INSTALLING DEPENDENCIES FINISHED =========="
            }
        }
    }
}
