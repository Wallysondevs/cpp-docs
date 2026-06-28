# Cabeçalho da biblioteca experimental &lt;experimental/filesystem&gt;

Este cabeçalho faz parte da biblioteca [filesystem](<#/doc/experimental/fs>).

Definido no namespace `std::experimental::filesystem`  
---  
Definido no namespace inline `std::experimental::filesystem::v1`  
  
### Classes  
  
[ path](<#/doc/experimental/fs/path>) | representa um path   
(class)  
[ filesystem_error](<#/doc/experimental/fs/filesystem_error>) | uma exceção lançada em erros do sistema de arquivos   
(class)  
[ directory_entry](<#/doc/experimental/fs/directory_entry>) | uma entrada de diretório   
(class)  
[ directory_iterator](<#/doc/experimental/fs/directory_iterator>) | um iterator para o conteúdo do diretório   
(class)  
[ recursive_directory_iterator](<#/doc/experimental/fs/recursive_directory_iterator>) | um iterator para o conteúdo de um diretório e seus subdiretórios   
(class)  
[ file_status](<#/doc/experimental/fs/file_status>) | representa o tipo e as permissões de um arquivo   
(class)  
[ space_info](<#/doc/experimental/fs/space_info>) | informações sobre espaço livre e disponível no sistema de arquivos   
(class)  
[ file_type](<#/doc/experimental/fs/file_type>) | o tipo de um arquivo   
(enum)  
[ perms](<#/doc/experimental/fs/perms>) | identifica permissões do sistema de arquivos   
(enum)  
[ copy_options](<#/doc/experimental/fs/copy_options>) | especifica a semântica das operações de cópia   
(enum)  
[ directory_options](<#/doc/experimental/fs/directory_options>) | opções para iterar o conteúdo do diretório   
(enum)  
[ file_time_type](<#/doc/experimental/fs/file_time_type>) | representa valores de tempo de arquivo   
(typedef)  
  
### Funções  
  
[ swap(std::experimental::filesystem::path)](<#/doc/experimental/fs/path/swap2>) | troca dois paths   
(function)  
[ hash_value](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/fs/path/hash_value&action=edit&redlink=1> "cpp/experimental/fs/path/hash value \(page does not exist\)") | calcula um valor hash para um objeto path   
(function)  
[ operator==operator!=operator<operator<=operator>operator>=](<#/doc/experimental/fs/path/operator_cmp>) | compara lexicograficamente dois paths   
(function)  
[ operator/](<#/doc/experimental/fs/path/operator_slash>) | concatena dois paths com um separador de diretório   
(function)  
[ operator<&lt;operator&gt;>](<#/doc/experimental/fs/path/operator_ltltgtgt>) | realiza entrada e saída de stream em um path   
(function)  
[ u8path](<#/doc/experimental/fs/path/u8path>) | cria um `path` a partir de uma fonte codificada em UTF-8   
(function)  
[ filesystem::begin(filesystem::directory_iterator)filesystem::end(filesystem::directory_iterator)](<#/doc/experimental/fs/directory_iterator/begin>) | suporte para loop for baseado em range   
(function)  
[ filesystem::begin(filesystem::recursive_directory_iterator)filesystem::end(filesystem::recursive_directory_iterator)](<#/doc/experimental/fs/recursive_directory_iterator/begin>) | suporte para loop for baseado em range   
(function)  
[ absolutesystem_complete](<#/doc/experimental/fs/absolute>) | compõe um caminho absoluto  
converte um path para um caminho absoluto replicando o comportamento específico do SO   
(function)  
[ canonical](<#/doc/experimental/fs/canonical>) | compõe um caminho canônico   
(function)  
[ copy](<#/doc/experimental/fs/copy>) | copia arquivos ou diretórios   
(function)  
[ copy_file](<#/doc/experimental/fs/copy_file>) | copia o conteúdo de arquivos   
(function)  
[ copy_symlink](<#/doc/experimental/fs/copy_symlink>) | copia um link simbólico   
(function)  
[ create_directorycreate_directories](<#/doc/experimental/fs/create_directory>) | cria um novo diretório   
(function)  
[ create_hard_link](<#/doc/experimental/fs/create_hard_link>) | cria um hard link   
(function)  
[ create_symlinkcreate_directory_symlink](<#/doc/experimental/fs/create_symlink>) | cria um link simbólico   
(function)  
[ current_path](<#/doc/experimental/fs/current_path>) | retorna o diretório de trabalho atual   
(function)  
[ exists](<#/doc/experimental/fs/exists>) | verifica se o path se refere a um objeto existente do sistema de arquivos   
(function)  
[ equivalent](<#/doc/experimental/fs/equivalent>) | verifica se dois paths se referem ao mesmo objeto do sistema de arquivos   
(function)  
[ file_size](<#/doc/experimental/fs/file_size>) | retorna o tamanho de um arquivo   
(function)  
[ hard_link_count](<#/doc/experimental/fs/hard_link_count>) | retorna o número de hard links que se referem ao arquivo específico   
(function)  
[ last_write_time](<#/doc/experimental/fs/last_write_time>) | obtém ou define o tempo da última modificação de dados   
(function)  
[ permissions](<#/doc/experimental/fs/permissions>) | modifica as permissões de acesso a arquivos   
(function)  
[ read_symlink](<#/doc/experimental/fs/read_symlink>) | obtém o alvo de um link simbólico   
(function)  
[ removeremove_all](<#/doc/experimental/fs/remove>) | remove um arquivo ou diretório vazio  
remove um arquivo ou diretório e todo o seu conteúdo, recursivamente   
(function)  
[ rename](<#/doc/experimental/fs/rename>) | move ou renomeia um arquivo ou diretório   
(function)  
[ resize_file](<#/doc/experimental/fs/resize_file>) | altera o tamanho de um arquivo regular por truncamento ou preenchimento com zeros   
(function)  
[ space](<#/doc/experimental/fs/space>) | determina o espaço livre disponível no sistema de arquivos   
(function)  
[ statussymlink_status](<#/doc/experimental/fs/status>) | determina atributos de arquivo  
determina atributos de arquivo, verificando o alvo do symlink   
(function)  
[ temp_directory_path](<#/doc/experimental/fs/temp_directory_path>) | retorna um diretório adequado para arquivos temporários   
(function)  
  
##### Tipos de arquivo   
  
[ is_block_file](<#/doc/experimental/fs/is_block_file>) | verifica se o path fornecido se refere a um dispositivo de bloco   
(function)  
[ is_character_file](<#/doc/experimental/fs/is_character_file>) | verifica se o path fornecido se refere a um dispositivo de caractere   
(function)  
[ is_directory](<#/doc/experimental/fs/is_directory>) | verifica se o path fornecido se refere a um diretório   
(function)  
[ is_empty](<#/doc/experimental/fs/is_empty>) | verifica se o path fornecido se refere a um arquivo ou diretório vazio   
(function)  
[ is_fifo](<#/doc/experimental/fs/is_fifo>) | verifica se o path fornecido se refere a um pipe nomeado   
(function)  
[ is_other](<#/doc/experimental/fs/is_other>) | verifica se o argumento se refere a um arquivo _outro_   
(function)  
[ is_regular_file](<#/doc/experimental/fs/is_regular_file>) | verifica se o argumento se refere a um arquivo regular   
(function)  
[ is_socket](<#/doc/experimental/fs/is_socket>) | verifica se o argumento se refere a um socket IPC nomeado   
(function)  
[ is_symlink](<#/doc/experimental/fs/is_symlink>) | verifica se o argumento se refere a um link simbólico   
(function)  
[ status_known](<#/doc/experimental/fs/status_known>) | verifica se o status do arquivo é conhecido   
(function)