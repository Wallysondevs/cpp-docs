# operator==(std::move_only_function)

```cpp
friend bool operator==( const std::move_only_function& f, std::nullptr_t ) noexcept;  // (desde C++23)
```

  
Verifica se o wrapper f possui um alvo chamável, comparando-o formalmente com [std::nullptr_t](<#/doc/types/nullptr_t>). Wrappers vazios (isto é, wrappers sem um alvo) comparam como iguais, funções não vazias comparam como diferentes.

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando `std::move_only_function<FunctionType>` é uma classe associada dos argumentos.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Parâmetros

f  |  \-  |  `std::move_only_function` para comparar   
  
### Valor de retorno

!f. 

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    #include <utility>
    
    using SomeVoidFunc = std::move_only_function<void(int) const>;
    
    class C {
    public:
        C() = default;
        C(SomeVoidFunc func) : void_func_(std::move(func)) {}
    
        void default_func(int i) const { std::cout << i << '\n'; };
    
        void operator()() const
        {
            if (void_func_ == nullptr) // specialized compare with nullptr
                default_func(7);
            else
                void_func_(7);
        }
    
    private:
        SomeVoidFunc void_func_{};
    };
    
    void user_func(int i)
    {
        std::cout << (i + 1) << '\n';
    }
    
    int main()
    {
        C c1;
        C c2(user_func);
        c1();
        c2();
    }
```

Saída: 
```
    7
    8
```

### Veja também

[ operator bool](<#/doc/utility/functional/move_only_function/operator_bool>) |  verifica se a `std::move_only_function` possui um alvo   
(função membro pública)  
[ operator==operator!=](<#/doc/utility/functional/function/operator_cmp>)(removido em C++20) |  compara uma [std::function](<#/doc/utility/functional/function>) com nullptr   
(modelo de função)