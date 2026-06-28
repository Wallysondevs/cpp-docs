# std::source_location::file_name

```cpp
constexpr const char* file_name() const noexcept;  // (desde C++20)
```

  
Retorna o nome do arquivo fonte atual representado por este objeto, representado como uma string de bytes terminada em nulo.

### Parâmetros

(nenhum)

### Valor de retorno

O nome do arquivo fonte atual representado por este objeto, representado como uma string de bytes terminada em nulo.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <source_location>
     
    void print_this_file_name(
        std::source_location location = std::source_location::current())
    {
        // Name of file that contains the call site of this function.
        std::cout << "File: " << location.file_name() << '\n';
    }
     
    int main()
    {
    #line 1 "cppreference.cpp"
        print_this_file_name();
    }
```

Saída: 
```
    File: cppreference.cpp
```

### Veja também

[ line](<#/doc/utility/source_location/line>) |  retorna o número da linha representado por este objeto   
(função membro pública)  
[ column](<#/doc/utility/source_location/column>) |  retorna o número da coluna representado por este objeto   
(função membro pública)  
[ function_name](<#/doc/utility/source_location/function_name>) |  retorna o nome da função representado por este objeto, se houver   
(função membro pública)  
[ source_file](<#/doc/utility/stacktrace_entry/source_file>) |  obtém o nome do arquivo fonte que contém lexicalmente a expressão ou instrução cuja avaliação é representada pelo `stacktrace_entry`   
(função membro pública de `std::stacktrace_entry`)  
[ Filename and line information](<#/doc/preprocessor/line>)