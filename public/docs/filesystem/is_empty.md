# std::filesystem::is_empty

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
bool is_empty( const std::filesystem::path& p );
bool is_empty( const std::filesystem::path& p, std::error_code& ec );
```

Verifica se o caminho fornecido se refere a um arquivo ou diretório vazio.

### Parâmetros

- **p** — caminho a ser examinado
- **ec** — código de erro a ser modificado em caso de erro

### Valor de retorno

`true` se o caminho indicado por `p` se refere a um arquivo ou diretório vazio, `false` caso contrário. A sobrecarga que não lança exceções retorna `false` se ocorrer um erro.

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com `p` como o primeiro argumento de caminho e o código de erro do sistema operacional como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada à API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        namespace fs = std::filesystem;
    
        const fs::path tmp_dir{fs::temp_directory_path()};
        std::cout << std::boolalpha
                  << "Temp dir: " << tmp_dir << '\n'
                  << "is_empty(): " << fs::is_empty(tmp_dir) << '\n';
    
        const fs::path tmp_name{tmp_dir / std::tmpnam(nullptr)};
        std::cout << "Temp file: " << tmp_name << '\n';
    
        std::ofstream file{tmp_name.string()};
        std::cout << "is_empty(): " << fs::is_empty(tmp_name) << '\n';
        file << "cppreference.com";
        file.flush();
        std::cout << "is_empty(): " << fs::is_empty(tmp_name) << '\n'
                  << "file_size(): " << fs::file_size(tmp_name) << '\n';
        file.close();
        fs::remove(tmp_name);
    }
```

Saída possível:
```
    Temp dir: "/tmp"
    is_empty(): false
    Temp file: "/tmp/fileCqd9DM"
    is_empty(): true
    is_empty(): false
    file_size(): 16
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3013](<https://cplusplus.github.io/LWG/issue3013>) | C++17 | Sobrecarga de `error_code` marcada como noexcept, mas pode alocar memória | noexcept removido

### Veja também

[ statussymlink_status](<#/doc/filesystem/status>)(C++17)(C++17) | determina atributos de arquivo
determina atributos de arquivo, verificando o alvo do symlink
(função)
[ exists](<#/doc/filesystem/exists>)(C++17) | verifica se o caminho se refere a um objeto do sistema de arquivos existente
(função)