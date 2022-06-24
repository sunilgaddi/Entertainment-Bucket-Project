pipeline {
    agent {label "linux-slave"}

    tools {nodejs "node"}

    stages {
        stage('Installing Dependencies') {
            steps {
                echo "========== INSTALLING DEPENDENCIES STARTED =========="

                echo "========== INSTALLING SERVER DEPENDENCIES  =========="

                sh "npm install"

                dir('client') {
                    
                    echo "========== INSTALLING CLIENT DEPENDENCIES  =========="
                    
                    sh "npm install"
                }

                echo "========== INSTALLING DEPENDENCIES FINISHED =========="
            }
        }
        stage('Build') {
           steps{
                dir('client') {
                    echo "========== CREATING BUILD =========="

                    sh "npm run build"

                    echo "========== BUILD FINISHED =========="
                }
            }
        }
    }
}
