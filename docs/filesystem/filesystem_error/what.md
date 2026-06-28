# std::filesystem::filesystem_error::what

```cpp
const char* what() const noexcept override;  // (desde C++17)
```

  
Retorna uma string de bytes explicativa. Esta string explicativa contém a string explicativa passada no momento da construção. As implementações são encorajadas a incluir os nomes de caminho de [path1()](<#/doc/filesystem/filesystem_error/path>) e [path2()](<#/doc/filesystem/filesystem_error/path>) em formato nativo e a string [std::system_error::what()](<#/doc/error/system_error/what>) dentro da string retornada também. 

### Parâmetros

(nenhum) 

### Valor de retorno

Uma string de bytes explicativa no estilo C que contém a string explicativa passada no momento da construção. 

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <filesystem>
    #include <iostream>
    #include <string_view>
    namespace fs = std::filesystem;
    
    void explain(std::string_view note, fs::filesystem_error const& ex)
    {
        std::cout << note << " exception:\n"
                  << "what(): " << ex.what() << '\n'
                  << "path1(): " << ex.path1() << ", path2(): "
                  << ex.path2() << "\n\n";
    }
    
    int main()
    {
        try
        {
            std::filesystem::rename("/dev", "/null");
        }
        catch(fs::filesystem_error const& ex)
        {
            explain("fs::rename()", ex);
        }
    
        for (auto const path : {"/bool", "/bin/cat", "/bin/mouse"})
            try
            {
                std::filesystem::create_directory(path);
            }
            catch(fs::filesystem_error const& ex)
            {
                explain("fs::create_directory()", ex);
            }
    }
```

Saída possível: 
```
    fs::rename() exception:
    what(): filesystem error: cannot rename: Permission denied [/dev] [/null]
    path1(): "/dev", path2(): "/null"
    
    fs::create_directory() exception:
    what(): filesystem error: cannot create directory: Permission denied [/bool]
    path1(): "/bool", path2(): ""
    
    fs::create_directory() exception:
    what(): filesystem error: cannot create directory: File exists [/bin/cat]
    path1(): "/bin/cat", path2(): ""
    
    fs::create_directory() exception:
    what(): filesystem error: cannot create directory: Read-only file system [/bin/mouse]
    path1(): "/bin/mouse", path2(): ""
```