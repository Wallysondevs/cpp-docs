# std::filesystem::directory_entry::replace_filename

void replace_filename( const [std::filesystem::path](<#/doc/filesystem/path>)& p ); |  (1)  |  (desde C++17)  
---|---|---
void replace_filename( const [std::filesystem::path](<#/doc/filesystem/path>)& p, [std::error_code](<#/doc/error/error_code>)& ec ); |  (2)  |  (desde C++17)  

  
Altera o nome do arquivo da entrada de diretório. 

Efetivamente modifica o membro path através de path.replace_filename(p) e chama [`refresh`](<#/doc/filesystem/directory_entry/refresh>) para atualizar os atributos em cache. Se ocorrer um erro, os valores dos atributos em cache são não especificados. 

Esta função não aplica nenhuma alteração ao filesystem. 

### Parâmetros

p  |  \-  |  o path a ser anexado ao path pai do path atualmente armazenado   
---|---|---
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

(nenhum) 

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.  

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros da API do sistema operacional subjacente, construída com p como o primeiro argumento path e o código de erro do sistema operacional como o argumento do código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
     
    int main()
    {
        namespace fs = std::filesystem;
        {
            fs::directory_entry entry{"alpha"};
            std::cout << entry << '\n';
            entry.replace_filename("omega");
            std::cout << entry << '\n';
        }
        {
            fs::directory_entry entry{"/alpha/"};
            std::cout << entry << '\n';
            entry.replace_filename("omega");
            std::cout << entry << '\n';
        }
    }
```

Saída: 
```
    "alpha"
    "omega"
    "/alpha/"
    "/alpha/omega"
```

### Veja também

[ assign](<#/doc/filesystem/directory_entry/assign>) |  atribui conteúdo   
(função membro pública)  
[ replace_filename](<#/doc/filesystem/path/replace_filename>) |  substitui o último componente do path por outro path   
(função membro pública de `std::filesystem::path`)