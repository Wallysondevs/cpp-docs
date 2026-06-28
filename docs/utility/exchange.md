# std::exchange

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T, class U = T >
T exchange( T& obj, U&& new_value );
(constexpr desde C++20)
(condicionalmente noexcept desde C++23)
```

Substitui o valor de `obj` por `new_value` e retorna o valor antigo de `obj`.

### Parâmetros

- **obj** — objeto cujo valor será substituído
- **new_value** — o valor a ser atribuído a `obj`
Requisitos de tipo
-`T` deve atender aos requisitos de [MoveConstructible](<#/doc/named_req/MoveConstructible>). Além disso, deve ser possível atribuir por movimento (move-assign) objetos do tipo `U` a objetos do tipo `T`.

### Valor de retorno

O valor antigo de `obj`.

### Exceções

```cpp
(nenhuma)  // (até C++23)
Especificação `noexcept`: noexcept(
std::is_nothrow_move_constructible_v<T> &&
std::is_nothrow_assignable_v<T&, U>
)  // (desde C++23)
```

### Possível implementação
```cpp
    template<class T, class U = T>
    constexpr // Desde C++20
    T exchange(T& obj, U&& new_value)
        noexcept( // Desde C++23
            std::is_nothrow_move_constructible<T>::value &&
            std::is_nothrow_assignable<T&, U>::value
        )
    {
        T old_value = std::move(obj);
        obj = std::forward<U>(new_value);
        return old_value;
    }
```

---

### Observações

`std::exchange` pode ser usado ao implementar [operadores de atribuição por movimento](<#/doc/language/move_operator>) e [construtores de movimento](<#/doc/language/move_constructor>):
```cpp
    struct S
    {
        int n;
    
        S(S&& other) noexcept : n{std::exchange(other.n, 0)} {}
    
        S& operator=(S&& other) noexcept
        {
            n = std::exchange(other.n, 0); // Move n, enquanto deixa zero em other.n
                                           // (nota: em auto-atribuição por movimento, n permanece inalterado)
            return *this;
        }
    };
```

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_exchange_function`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | [`std::exchange`](<#/doc/utility/exchange>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <utility>
    #include <vector>
    
    class stream
    {
    public:
        using flags_type = int;
    
    public:
        flags_type flags() const { return flags_; }
    
        // Substitui flags_ por newf e retorna o valor antigo.
        flags_type flags(flags_type newf) { return std::exchange(flags_, newf); }
    
    private:
        flags_type flags_ = 0;
    };
    
    void f() { std::cout << "f()"; }
    
    int main()
    {
        stream s;
    
        std::cout << s.flags() << '\n';
        std::cout << s.flags(12) << '\n';
        std::cout << s.flags() << "\n\n";
    
        std::vector<int> v;
    
        // Como o segundo parâmetro de template tem um valor padrão, é possível
        // usar uma lista de inicialização entre chaves como segundo argumento. A expressão abaixo
        // é equivalente a std::exchange(v, std::vector<int>{1, 2, 3, 4});
    
        std::exchange(v, {1, 2, 3, 4});
    
        std::copy(begin(v), end(v), std::ostream_iterator<int>(std::cout, ", "));
    
        std::cout << "\n\n";
    
        void (*fun)();
    
        // O valor padrão do parâmetro de template também torna possível usar uma
        // função normal como segundo argumento. A expressão abaixo é equivalente a
        // std::exchange(fun, static_cast<void(*)()>(f))
        std::exchange(fun, f);
        fun();
    
        std::cout << "\n\nSequência de Fibonacci: ";
        for (int a{0}, b{1}; a < 100; a = std::exchange(b, a + b))
            std::cout << a << ", ";
        std::cout << "...\n";
    }
```

Saída:
```
    0
    0
    12
    
    1, 2, 3, 4,
    
    f()
    
    Sequência de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
```

### Veja também

[ swap](<#/doc/utility/swap>) | troca os valores de dois objetos
(template de função)
[ atomic_exchangeatomic_exchange_explicit](<#/doc/atomic/atomic_exchange>)(C++11)(C++11) | substitui atomicamente o valor do objeto atômico por um argumento não atômico e retorna o valor antigo do atômico
(template de função)