# std::filesystem::directory_entry::assign

void assign( const [std::filesystem::path](<#/doc/filesystem/path>)& p ); |  (1)  |  (desde C++17)  
---|---|---
void assign( const [std::filesystem::path](<#/doc/filesystem/path>)& p, [std::error_code](<#/doc/error/error_code>)& ec ); |  (2)  |  (desde C++17)  

  
Atribui novo conteúdo ao objeto directory entry. Define o path para p e chama [`refresh`](<#/doc/filesystem/directory_entry/refresh>) para atualizar os atributos em cache. Se ocorrer um erro, os valores dos atributos em cache são não especificados.

Esta função não efetua nenhuma alteração no filesystem.

### Parâmetros

p  |  \-  |  path para o objeto do filesystem ao qual o directory entry irá se referir   
---|---|---
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

(nenhum)

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.  

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do SO, construída com p como o primeiro argumento path e o código de erro do SO como o argumento do código de erro.

2) Define um parâmetro `std::error_code`& para o código de erro da API do SO se uma chamada à API do SO falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    
    void print_entry_info(const std::filesystem::directory_entry& entry)
    {
        if (std::cout << "The entry " << entry; not entry.exists())
        {
            std::cout << " does not exists on the file system\n";
            return;
        }
        std::cout << " is ";
        if (entry.is_directory())
            std::cout << "a directory\n";
        if (entry.is_regular_file())
            std::cout << "a regular file\n";
        /*...*/
    }
    
    int main()
    {
        std::filesystem::current_path(std::filesystem::temp_directory_path());
    
        std::filesystem::directory_entry entry{std::filesystem::current_path()};
        print_entry_info(entry);
    
        std::filesystem::path name{"cppreference.html"};
        std::ofstream{name} << "C++";
    
        std::cout << "entry.assign();\n";
        entry.assign(entry/name);
        print_entry_info(entry);
    
        std::cout << "remove(entry);\n";
        std::filesystem::remove(entry);
        print_entry_info(entry); // the entry still contains old "state"
    
        std::cout << "entry.assign();\n";
        entry.assign(entry); // or just call entry.refresh()
        print_entry_info(entry);
    }
```

Saída possível:
```
    The entry "/tmp" is a directory
    entry.assign();
    The entry "/tmp/cppreference.html" is a regular file
    remove(entry);
    The entry "/tmp/cppreference.html" is a regular file
    entry.assign();
    The entry "/tmp/cppreference.html" does not exists on the file system
```

### Ver também

[ operator=](<#/>) |  atribui conteúdo   
(função membro pública)  