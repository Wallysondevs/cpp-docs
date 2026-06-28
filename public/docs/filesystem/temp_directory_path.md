# std::filesystem::temp_directory_path

Definido no header `[<filesystem>](<#/doc/header/filesystem>)`

```cpp
path temp_directory_path();  // (1) (desde C++17)
path temp_directory_path( std::error_code& ec );  // (2) (desde C++17)
```

Retorna o local do diretório adequado para arquivos temporários.

### Parâmetros

(nenhum)

### Valor de retorno

Um diretório adequado para arquivos temporários. O path tem garantia de existir e ser um diretório. A sobrecarga que aceita o argumento error_code& retorna um path vazio em caso de erro.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construída com o path a ser retornado como o primeiro argumento path e o código de erro do sistema operacional como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

Em sistemas POSIX, o path pode ser aquele especificado nas variáveis de ambiente `TMPDIR`, `TMP`, `TEMP`, `TEMPDIR` e, se nenhuma delas for especificada, o path "/tmp" é retornado.

Em sistemas Windows, o path é tipicamente aquele retornado por [`GetTempPath`](<https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-gettemppathw>).

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        std::cout << "Temp directory is " << fs::temp_directory_path() << '\n';
    }
```

Saída possível:
```
    Temp directory is "C:\Windows\TEMP\"
```

### Veja também

[ tmpfile](<#/doc/io/c/tmpfile>) | cria e abre um arquivo temporário com remoção automática
(função)
[ current_path](<#/doc/filesystem/current_path>)(C++17) | retorna ou define o diretório de trabalho atual
(função)