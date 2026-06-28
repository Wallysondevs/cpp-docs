# std::experimental::source_location::file_name

constexpr const char* file_name() const noexcept; |  |  (library fundamentals TS v2)  

  
Retorna o nome do arquivo fonte atual representado por este objeto, representado como uma string de bytes terminada em nulo.

### Parâmetros

(nenhum)

### Valor de retorno

O nome do arquivo fonte atual representado por este objeto, representado como uma string de bytes terminada em nulo.

### Exemplo

Execute este código
```
    #include <experimental/source_location>
    #include <iostream>
     
    inline void print_this_file_name(
        const std::experimental::source_location& location
            = std::experimental::source_location::current())
    {
        // Name of file that contains the call-site of this function.
        std::cout << "File: " << location.file_name() << '\n';
    }
     
    int main()
    {
        print_this_file_name();
    }
```

Saída possível: 
```
    File: main.cpp
```

### Veja também

[ line](<#/doc/experimental/source_location/line>) |  retorna o número da linha representado por este objeto   
(função membro pública)  
[ column](<#/doc/experimental/source_location/column>) |  retorna o número da coluna representado por este objeto   
(função membro pública)  
[ function_name](<#/doc/experimental/source_location/function_name>) |  retorna o nome da função representado por este objeto, se houver   
(função membro pública)  
[C++ documentation](<#/doc/preprocessor/line>) para informações de nome de arquivo e linha