# Biblioteca Filesystem

A biblioteca Filesystem, ISO/IEC TS 18822:2015, fornece facilidades para realizar operações em sistemas de arquivos e seus componentes, como caminhos, arquivos regulares e diretórios.

Esta biblioteca é uma [especificação técnica](<#/doc/experimental>) opcional e pode não estar disponível se um sistema de arquivos hierárquico não for acessível à implementação, ou se ela não fornecer as capacidades necessárias. Alguns recursos podem não estar disponíveis se não forem suportados pelo sistema de arquivos subjacente (ex: o sistema de arquivos FAT não possui hardlinks, softlinks e outros recursos).

O comportamento é [indefinido](<#/doc/language/ub>) se as chamadas a funções nesta biblioteca introduzirem uma _condição de corrida do sistema de arquivos_, isto é, quando múltiplas threads, processos ou computadores intercalam acesso e modificação ao mesmo objeto em um sistema de arquivos.

Esta biblioteca é baseada diretamente em [boost.filesystem](<https://www.boost.org/doc/libs/release/libs/filesystem/doc/index.htm>), que está atualmente disponível em mais compiladores e plataformas do que esta especificação técnica experimental.

#### Definições em toda a biblioteca

*   _file_ : um objeto do sistema de arquivos que contém dados, pode ser escrito, lido ou ambos. Arquivos têm nomes, atributos, um dos quais é o tipo de arquivo:

*   _directory_ : um arquivo que atua como um contêiner de entradas de diretório, que identificam outros arquivos (alguns dos quais podem ser outros diretórios aninhados). Ao discutir um arquivo específico, o diretório no qual ele aparece como uma entrada é seu _diretório pai_. O diretório pai pode ser representado pelo nome de caminho relativo "..".
*   _hard link_ : uma entrada de diretório que associa um nome a um arquivo existente. Se múltiplos hard links forem suportados, o arquivo é removido depois que o último hard link para ele é removido.
*   _symbolic link_ : uma entrada de diretório que associa um nome a um caminho, que pode ou não existir.
*   _regular file_ : um arquivo que não é um dos outros tipos de arquivo.

*   _file name_ : uma string de caracteres que nomeia um arquivo. Caracteres permitidos, sensibilidade a maiúsculas/minúsculas, comprimento máximo e nomes não permitidos são definidos pela implementação. Os nomes . (ponto) e .. (ponto-ponto) têm significado especial no nível da biblioteca.
*   _path_ : sequência de elementos que identifica um arquivo. Começa com um nome de raiz opcional (ex: "C:" ou "//server"), seguido por um diretório raiz opcional (ex: "/" no Unix), seguido por uma sequência de zero ou mais nomes de arquivo (todos, exceto o último, devem ser diretórios ou links para diretórios). O formato nativo (ex: quais caracteres são usados como separadores) e a codificação de caracteres da representação em string de um caminho (o _pathname_) são definidos pela implementação; esta biblioteca fornece representação portátil de caminhos.

*   _absolute path_ : um caminho que identifica inequivocamente a localização de um arquivo.
*   _canonical path_ : um caminho absoluto que não inclui symlinks, elementos "." ou "..".
*   _relative path_ : um caminho que identifica um arquivo em relação a alguma localização no sistema de arquivos. Os nomes de caminho especiais . (ponto, "diretório atual") e .. (ponto-ponto, "diretório pai") são caminhos relativos.

### Classes

[ path](<#/doc/experimental/fs/path>) | representa um caminho
(class)
[ filesystem_error](<#/doc/experimental/fs/filesystem_error>) | uma exceção lançada em erros do sistema de arquivos
(class)
[ directory_entry](<#/doc/experimental/fs/directory_entry>) | uma entrada de diretório
(class)
[ directory_iterator](<#/doc/experimental/fs/directory_iterator>) | um iterator para o conteúdo do diretório
(class)
[ recursive_directory_iterator](<#/doc/experimental/fs/recursive_directory_iterator>) | um iterator para o conteúdo de um diretório e seus subdiretórios
(class)
[ file_status](<#/doc/experimental/fs/file_status>) | representa o tipo e as permissões do arquivo
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

### Funções não-membro

[ absolutesystem_complete](<#/doc/experimental/fs/absolute>) | compõe um caminho absoluto
converte um caminho para um caminho absoluto replicando o comportamento específico do SO
(function)
[ canonical](<#/doc/experimental/fs/canonical>) | compõe um caminho canônico
(function)
[ copy](<#/doc/experimental/fs/copy>) | copia arquivos ou diretórios
(function)
[ copy_file](<#/doc/experimental/fs/copy_file>) | copia o conteúdo do arquivo
(function)
[ copy_symlink](<#/doc/experimental/fs/copy_symlink>) | copia um symbolic link
(function)
[ create_directorycreate_directories](<#/doc/experimental/fs/create_directory>) | cria um novo diretório
(function)
[ create_hard_link](<#/doc/experimental/fs/create_hard_link>) | cria um hard link
(function)
[ create_symlinkcreate_directory_symlink](<#/doc/experimental/fs/create_symlink>) | cria um symbolic link
(function)
[ current_path](<#/doc/experimental/fs/current_path>) | retorna o diretório de trabalho atual
(function)
[ exists](<#/doc/experimental/fs/exists>) | verifica se o caminho se refere a um objeto existente do sistema de arquivos
(function)
[ equivalent](<#/doc/experimental/fs/equivalent>) | verifica se dois caminhos se referem ao mesmo objeto do sistema de arquivos
(function)
[ file_size](<#/doc/experimental/fs/file_size>) | retorna o tamanho de um arquivo
(function)
[ hard_link_count](<#/doc/experimental/fs/hard_link_count>) | retorna o número de hard links que se referem ao arquivo específico
(function)
[ last_write_time](<#/doc/experimental/fs/last_write_time>) | obtém ou define a hora da última modificação de dados
(function)
[ permissions](<#/doc/experimental/fs/permissions>) | modifica as permissões de acesso ao arquivo
(function)
[ read_symlink](<#/doc/experimental/fs/read_symlink>) | obtém o alvo de um symbolic link
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

[ is_block_file](<#/doc/experimental/fs/is_block_file>) | verifica se o caminho dado se refere a um dispositivo de bloco
(function)
[ is_character_file](<#/doc/experimental/fs/is_character_file>) | verifica se o caminho dado se refere a um dispositivo de caractere
(function)
[ is_directory](<#/doc/experimental/fs/is_directory>) | verifica se o caminho dado se refere a um diretório
(function)
[ is_empty](<#/doc/experimental/fs/is_empty>) | verifica se o caminho dado se refere a um arquivo ou diretório vazio
(function)
[ is_fifo](<#/doc/experimental/fs/is_fifo>) | verifica se o caminho dado se refere a um pipe nomeado
(function)
[ is_other](<#/doc/experimental/fs/is_other>) | verifica se o argumento se refere a um arquivo _outro_
(function)
[ is_regular_file](<#/doc/experimental/fs/is_regular_file>) | verifica se o argumento se refere a um arquivo regular
(function)
[ is_socket](<#/doc/experimental/fs/is_socket>) | verifica se o argumento se refere a um socket IPC nomeado
(function)
[ is_symlink](<#/doc/experimental/fs/is_symlink>) | verifica se o argumento se refere a um symbolic link
(function)
[ status_known](<#/doc/experimental/fs/status_known>) | verifica se o status do arquivo é conhecido
(function)

### Veja também

[documentação C++](<#/doc/filesystem>) para a biblioteca Filesystem (C++17)
---