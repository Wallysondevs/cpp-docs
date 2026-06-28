# std::filesystem::remove, std::filesystem::remove_all

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool remove( const std::filesystem::path& p );
bool remove( const std::filesystem::path& p, std::error_code& ec ) noexcept;
std::uintmax_t remove_all( const std::filesystem::path& p );
std::uintmax_t remove_all( const std::filesystem::path& p, std::error_code& ec );
```

1,2) O arquivo ou diretório vazio identificado pelo caminho p é excluído como se fosse pela função POSIX [`remove`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remove.html>). Symlinks não são seguidos (o symlink é removido, não seu alvo).

3,4) Exclui o conteúdo de p (se for um diretório) e o conteúdo de todos os seus subdiretórios, recursivamente, então exclui o próprio p como se aplicando repetidamente a função POSIX [`remove`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/remove.html>). Symlinks não são seguidos (o symlink é removido, não seu alvo).

### Parâmetros

- **p** — caminho a ser excluído
- **ec** — parâmetro de saída para relatório de erro na sobrecarga que não lança exceções.

### Valor de retorno

1,2) `true` se o arquivo foi excluído, `false` se ele não existia. A sobrecarga que aceita o argumento `error_code&` retorna `false` em caso de erros.

3,4) Retorna o número de arquivos e diretórios que foram excluídos (que pode ser zero se p não existia para começar). A sobrecarga que aceita o argumento `error_code&` retorna `static_cast<std::uintmax_t>(-1)` em caso de erro.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1,3) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com `p` como o primeiro argumento de caminho e o código de erro do SO como o argumento de código de erro.

2,4) Define um parâmetro `std::error_code&` para o código de erro da API do SO se uma chamada da API do SO falhar, e executa `ec.clear()` se nenhum erro ocorrer.

### Observações

Em sistemas POSIX, esta função tipicamente chama [`unlink`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html>) e [`rmdir`](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html>) conforme necessário; no Windows, [`DeleteFileW`](<https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-deletefilew>) e [`RemoveDirectoryW`](<https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-removedirectoryw>).

Se `p` não existia, esta função retorna `false` e não reporta um erro.

### Exemplo

Execute este código
```cpp
    #include <cstdint>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        namespace fs = std::filesystem;
        std::cout << std::boolalpha;
    
        fs::path tmp{std::filesystem::temp_directory_path()};
    
        const auto O_O{"O_O"};
        std::ofstream{tmp / O_O} << O_O; // creates file containing O_O
        std::cout << "remove(): " << fs::remove(tmp / O_O) << '\n'; // success
        std::cout << "remove(): " << fs::remove(tmp / O_O) << '\n'; // fail
    
        std::filesystem::create_directories(tmp / "abcdef/example");
        const std::uintmax_t n{fs::remove_all(tmp / "abcdef")};
        std::cout << "remove_all(): " << n << " files or directories\n";
    }
```

Saída possível:
```
    remove(): true
    remove(): false
    remove_all(): 2 files or directories
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3014](<https://cplusplus.github.io/LWG/issue3014>) | C++17 | Sobrecarga de `error_code` de `remove_all` marcada como `noexcept`, mas pode alocar memória | `noexcept` removido

### Veja também

[ remove](<#/doc/io/c/remove>) | apaga um arquivo
(função)