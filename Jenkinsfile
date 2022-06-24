pipeline {
    agent {label "linux-slave"}
    
    tools {nodejs "node"}
    
    stages {
        stage('Installing Dependencies') {
            steps {
                echo "========== INSTALLING DEPENDENCIES STARTED =========="
                sh "npm install"
                dir('client') {
                    sh "npm install"
                    sh "npm run build"
                }
                echo "========== INSTALLING DEPENDENCIES FINISHED =========="
            }
        }
    }
}
