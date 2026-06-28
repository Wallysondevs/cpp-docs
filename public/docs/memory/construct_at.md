# std::construct_at

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T, class... Args >
constexpr T* construct_at( T* location, Args&&... args );
```

Cria um objeto `T` inicializado com os argumentos em `args` no endereço `location` fornecido.

Equivalente a if constexpr ([std::is_array_v](<#/doc/types/is_array>)&lt;T&gt;)
` `return ::new ([`_voidify_`](<#/doc/memory/voidify>) ﻿(*location)) T[1]();
else
` `return ::new ([`_voidify_`](<#/doc/memory/voidify>) ﻿(*location)) T([std::forward](<#/doc/utility/forward>)&lt;Args&gt;(args)...); , exceto que `construct_at` pode ser usado na avaliação de [expressões constantes](<#/doc/language/constant_expression>)(até C++26).

Quando `construct_at` é chamado na avaliação de alguma expressão constante `expr`, `location` deve apontar para um armazenamento obtido por [std::allocator](<#/doc/memory/allocator>)&lt;T&gt;::allocate ou para um objeto cuja vida útil começou dentro da avaliação de `expr`.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas:

  * [std::is_unbounded_array_v](<#/doc/types/is_unbounded_array>)&lt;T&gt; é falso.
  * ::new([std::declval](<#/doc/utility/declval>)<void*>()) T([std::declval](<#/doc/utility/declval>)&lt;Args&gt;()...) é bem-formado quando tratado como um [operando não avaliado](<#/doc/language/expressions>).

Se [std::is_array_v](<#/doc/types/is_array>)&lt;T&gt; for verdadeiro e `sizeof...(Args)` for diferente de zero, o programa é malformado.

### Parâmetros

- **location** — ponteiro para o armazenamento não inicializado no qual um objeto `T` será construído
- **args...** — argumentos usados para inicialização

### Valor de retorno

`location`

### Exemplo

Execute este código
```
    #include <bit>
    #include <memory>
    
    class S
    {
        int x_;
        float y_;
        double z_;
    public:
        constexpr S(int x, float y, double z) : x_{x}, y_{y}, z_{z} {}
        [[nodiscard("no side-effects!")]]
        constexpr bool operator==(const S&) const noexcept = default;
    };
    
    consteval bool test()
    {
        alignas(S) unsigned char storage[sizeof(S)]{};
        S uninitialized = std::bit_cast<S>(storage);
        std::destroy_at(&uninitialized);
        S* ptr = std::construct_at(std::addressof(uninitialized), 42, 2.71f, 3.14);
        const bool res{*ptr == S{42, 2.71f, 3.14}};
        std::destroy_at(ptr);
        return res;
    }
    static_assert(test());
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 3436](<https://cplusplus.github.io/LWG/issue3436>) | C++20 | `construct_at` não podia criar objetos de tipos array | pode inicializar por valor arrays de tamanho fixo
[LWG 3870](<https://cplusplus.github.io/LWG/issue3870>) | C++20 | `construct_at` podia criar objetos de tipos cv-qualificados | apenas tipos cv-não-qualificados são permitidos

### Ver também

[ allocate](<#/doc/memory/allocator/allocate>) | aloca armazenamento não inicializado
(função membro pública de `std::allocator<T>`)
[ construct](<#/doc/memory/allocator_traits/construct>)[static] | constrói um objeto no armazenamento alocado
(modelo de função)
[ destroy_at](<#/doc/memory/destroy_at>)(C++17) | destrói um objeto em um endereço fornecido
(modelo de função)
[ ranges::construct_at](<#/doc/memory/ranges/construct_at>)(C++20) | cria um objeto em um endereço fornecido
(objeto de função de algoritmo)