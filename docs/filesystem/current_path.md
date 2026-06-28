# std::filesystem::current_path

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
path current_path();
path current_path( std::error_code& ec );
void current_path( const std::filesystem::path& p );
void current_path( const std::filesystem::path& p,
std::error_code& ec ) noexcept;
```

Retorna ou altera o caminho atual.

1,2) Retorna o caminho absoluto do diretório de trabalho atual, obtido como se (em formato nativo) por POSIX [`getcwd`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html>). (2) retorna path() se ocorrer um erro.

3,4) Altera o diretório de trabalho atual para p, como se por POSIX [`chdir`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html>).

### Parâmetros

- **p** — caminho para o qual alterar o diretório de trabalho atual
- **ec** — parâmetro de saída para relatório de erros nas sobrecargas que não lançam exceções

### Valor de retorno

1,2) Retorna o diretório de trabalho atual.

3,4) (nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com o código de erro do SO como argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento de caminho e o código de erro do SO como argumento do código de erro.

4) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do SO se uma chamada da API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Notas

O diretório de trabalho atual é o diretório, associado ao processo, que é usado como local de partida na resolução de nomes de caminho para caminhos relativos.

O caminho atual, conforme retornado por muitos sistemas operacionais, é uma variável global perigosa. Ele pode ser alterado inesperadamente por funções de bibliotecas de terceiros ou do sistema, ou por outra thread.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        std::cout << "Current path is " << fs::current_path() << '\n'; // (1)
        fs::current_path(fs::temp_directory_path()); // (3)
        std::cout << "Current path is " << fs::current_path() << '\n';
    }
```

Saída possível:
```
    Current path is "D:/local/ConsoleApplication1"
    Current path is "E:/Temp"
```

### Veja também

[ temp_directory_path](<#/doc/filesystem/temp_directory_path>)(C++17) | retorna um diretório adequado para arquivos temporários
(função)