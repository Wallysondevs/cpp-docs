# operator==,!=(std::function)

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class R, class... ArgTypes >
bool operator==( const std::function<R(ArgTypes...)>& f,
std::nullptr_t ) noexcept;
template< class R, class... ArgTypes >
bool operator==( std::nullptr_t,
const std::function<R(ArgTypes...)>& f ) noexcept;
(até C++20)
template< class R, class... ArgTypes >
bool operator!=( const std::function<R(ArgTypes...)>& f,
std::nullptr_t ) noexcept;
(até C++20)
template< class R, class... ArgTypes >
bool operator!=( std::nullptr_t,
const std::function<R(ArgTypes...)>& f ) noexcept;
(até C++20)
```

Compara um `std::function` com um ponteiro nulo. Funções vazias (isto é, funções sem um alvo chamável) comparam como iguais, funções não vazias comparam como não iguais.

```cpp
O operador `!=` é sintetizado a partir de `operator==`.  // (desde C++20)
```

### Parâmetros

- **f** — `std::function` para comparar

### Valor de retorno

1,2) !f

3,4) (bool) f

### Exemplo

Execute este código
```cpp
    #include <functional>
    #include <iostream>
    
    using SomeVoidFunc = std::function<void(int)>;
    
    class C
    {
    public:
        C(SomeVoidFunc void_func = nullptr) : void_func_(void_func)
        {
            if (void_func_ == nullptr) // specialized compare with nullptr
                void_func_ = std::bind(&C::default_func, this, std::placeholders::_1);
            void_func_(7);
        }
    
        void default_func(int i) { std::cout << i << '\n'; };
    
    private:
        SomeVoidFunc void_func_;
    };
    
    void user_func(int i)
    {
        std::cout << (i + 1) << '\n';
    }
    
    int main()
    {
        C c1;
        C c2(user_func);
    }
```

Saída:
```
    7
    8
```

### Veja também

[ operator==](<#/>)(C++23) | compara um `std::move_only_function` com nullptr
(função)