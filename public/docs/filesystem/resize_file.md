# std::filesystem::resize_file

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void resize_file( const std::filesystem::path& p,
std::uintmax_t new_size );
void resize_file( const std::filesystem::path& p,
std::uintmax_t new_size,
std::error_code& ec ) noexcept;
```

Altera o tamanho do arquivo regular nomeado por p como se fosse pela função POSIX [`truncate`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/truncate.html>): se o tamanho do arquivo era anteriormente maior que new_size, o restante do arquivo é descartado. Se o arquivo era anteriormente menor que new_size, o tamanho do arquivo é aumentado e a nova área aparece como se estivesse preenchida com zeros.

### Parâmetros

- **p** — caminho para redimensionar
- **new_size** — tamanho que o arquivo terá agora
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções

### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

Em sistemas que suportam arquivos esparsos, aumentar o tamanho do arquivo não aumenta o espaço que ele ocupa no sistema de arquivos: a alocação de espaço ocorre apenas quando bytes não-zero são escritos no arquivo.

### Exemplo

Demonstra o efeito que a criação de um arquivo esparso tem no espaço livre.

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    #include <locale>
     
    int main()
    {
        auto p = std::filesystem::temp_directory_path() / "example.bin";
        std::ofstream{p}.put('a');
        std::cout.imbue(std::locale{"en_US.UTF8"});
        std::cout << "File size:  " << std::filesystem::file_size(p) << '\n'
                  << "Free space: " << std::filesystem::space(p).free << '\n';
        std::filesystem::resize_file(p, 64*1024); // resize to 64 KB
        std::cout << "File size:  " << std::filesystem::file_size(p) << '\n'
                  << "Free space: " << std::filesystem::space(p).free << '\n';
        std::filesystem::remove(p);
    }
```

Saída possível:
```
    File size:  1
    Free space: 42,954,108,928
    File size:  65,536
    Free space: 42,954,108,928
```

### Veja também

[ file_size](<#/doc/filesystem/file_size>)(desde C++17) | retorna o tamanho de um arquivo
(função)
[ space](<#/doc/filesystem/space>)(desde C++17) | determina o espaço livre disponível no sistema de arquivos
(função)