# std::filesystem::is_other

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool is_other( std::filesystem::file_status s ) noexcept;
bool is_other( const std::filesystem::path& p );
bool is_other( const std::filesystem::path& p, std::error_code& ec ) noexcept;
```

Verifica se o status de arquivo ou caminho fornecido corresponde a um arquivo do tipo _outro_. Ou seja, o arquivo existe, mas não é um arquivo regular, nem um diretório, nem um symlink.

1) Equivalente a exists(s) && !is_regular_file(s) && !is_directory(s) && !is_symlink(s).

2,3) Equivalente a is_other(status(p)) ou is_other(status(p, ec)), respectivamente.

### Parâmetros

- **s** — status de arquivo a verificar
- **p** — caminho a examinar
- **ec** — código de erro para armazenar o status do erro

### Valor de retorno

true se o arquivo indicado por p ou se o tipo indicado por s se refere a um arquivo que não é um arquivo regular, diretório ou um symlink, false caso contrário. A sobrecarga que não lança exceções retorna false se ocorrer um erro.

### Exceções

Qualquer sobrecarga não marcada com `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

2,3) Define um parâmetro `std::error_code`& para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(desde C++17)(desde C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ file_status](<#/doc/filesystem/file_status>)(desde C++17) | representa tipo e permissões de arquivo
(classe)
[ status_known](<#/doc/filesystem/status_known>)(desde C++17) | verifica se o status do arquivo é conhecido
(função)
[ is_block_file](<#/doc/filesystem/is_block_file>)(desde C++17) | verifica se o caminho fornecido se refere a um dispositivo de bloco
(função)
[ is_character_file](<#/doc/filesystem/is_character_file>)(desde C++17) | verifica se o caminho fornecido se refere a um dispositivo de caractere
(função)
[ is_directory](<#/doc/filesystem/is_directory>)(desde C++17) | verifica se o caminho fornecido se refere a um diretório
(função)
[ is_fifo](<#/doc/filesystem/is_fifo>)(desde C++17) | verifica se o caminho fornecido se refere a um pipe nomeado
(função)
[ is_regular_file](<#/doc/filesystem/is_regular_file>)(desde C++17) | verifica se o argumento se refere a um arquivo regular
(função)
[ is_socket](<#/doc/filesystem/is_socket>)(desde C++17) | verifica se o argumento se refere a um socket IPC nomeado
(função)
[ is_symlink](<#/doc/filesystem/is_symlink>)(desde C++17) | verifica se o argumento se refere a um link simbólico
(função)
[ exists](<#/doc/filesystem/exists>)(desde C++17) | verifica se o caminho se refere a um objeto existente do sistema de arquivos
(função)
[ is_other](<#/doc/filesystem/directory_entry/is_other>) | verifica se a entrada de diretório se refere a um arquivo _outro_
(função membro pública de `std::filesystem::directory_entry`)