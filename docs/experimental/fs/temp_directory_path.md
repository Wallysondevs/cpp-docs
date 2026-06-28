# std::experimental::filesystem::temp_directory_path

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
path temp_directory_path();
path temp_directory_path( error_code& ec );
```

Retorna o local do diretório adequado para arquivos temporários.

### Parâmetros

(nenhum)

### Valor de retorno

Um diretório adequado para arquivos temporários. O caminho é garantido como existente e como sendo um diretório. A sobrecarga que aceita o argumento `error_code&` retorna um caminho vazio em caso de erro.

### Exceções

A sobrecarga que não aceita um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do SO, construída com o caminho a ser retornado como o primeiro argumento e o código de erro do SO como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que aceita um parâmetro `error_code&` o define para o código de erro da API do SO se uma chamada à API do SO falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui

especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

### Notas

Em sistemas POSIX, o caminho pode ser aquele especificado nas variáveis de ambiente `TMPDIR`, `TMP`, `TEMP`, `TEMPDIR`, e, se nenhuma delas for especificada, o caminho "/tmp" é retornado.

Em sistemas Windows, o caminho é tipicamente aquele retornado por `GetTempPath`.

### Exemplo

Execute este código
```
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
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

[ tmpfile](<#/doc/io/c/tmpfile>) | cria e abre um arquivo temporário de remoção automática
(função)