# swap(std::move_only_function)

```cpp
friend void swap( std::move_only_function& lhs, std::move_only_function& rhs ) noexcept;  // (desde C++23)
```

Sobrecarga o algoritmo [std::swap](<#/doc/utility/swap>) para std::move_only_function. Troca o estado de lhs com o de rhs. Efetivamente chama lhs.swap(rhs).

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::move_only_function<FunctionType>` é uma classe associada dos argumentos.

### Parâmetros

- **lhs, rhs** — objetos `std::move_only_function` cujos estados devem ser trocados

### Valor de retorno

(nenhum)

### Exemplo

Execute este código
```cpp
    #include <concepts>
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
        std::move_only_function<void(const char*, int) const> f1{foo};
        std::move_only_function<void(const char*, int) const> f2{bar};
    
        f1("f1", 1);
        f2("f2", 2);
    
        std::cout << "std::ranges::swap(f1, f2);\n";
        std::ranges::swap(f1, f2); // finds the hidden friend
    
        f1("f1", 1);
        f2("f2", 2);
    }
```

Saída:
```
    foo("f1", 1)
    bar("f2", 2)
    std::ranges::swap(f1, f2);
    bar("f1", 1)
    foo("f2", 2)
```

### Veja também

[ swap](<#/doc/utility/functional/move_only_function/swap>) | troca os alvos de dois objetos `std::move_only_function`
(função membro pública)
[ std::swap(std::function)](<#/doc/utility/functional/function/swap2>)(C++11) | especializa o algoritmo [std::swap](<#/doc/utility/swap>)
(template de função)