# std::function&lt;R(Args...)&gt;::swap

```cpp
void swap( function& other ) noexcept;  // (desde C++11)
```

  
Troca os objetos invocáveis armazenados de *this e `other`. 

### Parâmetros

other  |  \-  |  wrapper de função para trocar o objeto invocável armazenado com   
  
### Valor de retorno

(nenhum) 

### Exemplo

Execute este código
```cpp 
    #include <functional>
    #include <iostream>
     
    void foo(const char* str, int x)
    {
        std::cout << "foo(\"" << str << "\", " << x << ")\n";
    }
     
    void bar(const char* str, int x)
    {
        std::cout << "bar(\"" << str << "\", " << x << ")\n";
    }
     
    int main()
    {
        std::function<void(const char*, int)> f1{foo};
        std::function<void(const char*, int)> f2{bar};
     
        f1("f1", 1);
        f2("f2", 2);
     
        std::cout << "f1.swap(f2);\n";
        f1.swap(f2);
     
        f1("f1", 1);
        f2("f2", 2);
    }
```

Saída: 
```
    foo("f1", 1)
    bar("f2", 2)
    f1.swap(f2);
    bar("f1", 1)
    foo("f2", 2)
```

### Veja também

[ swap](<#/doc/utility/functional/move_only_function/swap>) |  troca os alvos de dois objetos `std::move_only_function`   
(função membro pública de `std::move_only_function`)  