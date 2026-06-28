# std::is_destructible, std::is_trivially_destructible, std::is_nothrow_destructible

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_destructible;
template< class T >
struct is_trivially_destructible;
template< class T >
struct is_nothrow_destructible;
```

1) Se `T` é um tipo de referência, fornece a constante membro value igual a true.

Se `T` é (possivelmente cv-qualificado) void, um tipo de função, ou um array de tamanho desconhecido, value é igual a false.

Se `T` é um tipo de objeto, então, para o tipo `U` que é [std::remove_all_extents](<#/doc/types/remove_all_extents>)&lt;T&gt;::type, se a expressão [std::declval](<#/doc/utility/declval>)<U&>().~U() é bem-formada em um contexto não avaliado, value é igual a true. Caso contrário, value é igual a false.

2) O mesmo que (1) e adicionalmente [std::remove_all_extents](<#/doc/types/remove_all_extents>)&lt;T&gt;::type é um tipo não-classe ou um tipo de classe com um [destrutor trivial](<#/doc/language/destructor>).

3) O mesmo que (1), mas o destrutor é noexcept.

Se `T` não é um tipo completo, (possivelmente cv-qualificado) void, ou um array de tamanho desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depende, direta ou indiretamente, de um tipo incompleto, e essa instanciação poderia produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adiciona especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T >
constexpr bool is_destructible_v = is_destructible<T>::value;  // (desde C++17)
template< class T >
constexpr bool is_trivially_destructible_v = is_trivially_destructible<T>::value;  // (desde C++17)
template< class T >
constexpr bool is_nothrow_destructible_v = is_nothrow_destructible<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` é destrutível, false caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para bool, retorna value
(função membro pública)
operator()(C++14) | retorna value
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Como o programa C++ termina se um destrutor lança uma exceção durante o desenrolamento da pilha (o que geralmente não pode ser previsto), todos os destrutores práticos são não-lançadores de exceções mesmo que não sejam declarados noexcept. Todos os destrutores encontrados na standard library C++ são não-lançadores de exceções.

O armazenamento ocupado por objetos [trivially destructible](<#/doc/language/destructor>) [pode ser reutilizado](<#/doc/language/lifetime>) sem chamar o destrutor.

### Implementação possível

[is_destructible (1)](<#/doc/types/is_destructible>)
---
```cpp
    // C++20 required
    template<typename t>
    struct is_destructible
        : std::integral_constant<bool, requires(t object) { object.~t(); }>
    {};
```

[is_trivially_destructible (2)](<#/doc/types/is_destructible>)
```cpp
    // Not real C++. Shall P2996 be approved, the following implementation will be available:
    template<typename t>
    struct is_trivially_destructible
         : std::integral_constant<bool, std::meta::type_is_trivially_destructible(^t)>
    {};
```

[is_nothrow_destructible (3)](<#/doc/types/is_destructible>)
```cpp
    // C++20 required
    template<typename t>
    struct is_nothrow_destructible
        : std::integral_constant<bool, requires(t object) { {object.~t()} noexcept; }>
    {};
```

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <type_traits>
    
    struct Foo
    {
        std::string str;
        ~Foo() noexcept {};
    };
    
    struct Bar
    {
        ~Bar() = default;
    };
    
    static_assert(std::is_destructible<std::string>::value == true);
    static_assert(std::is_trivially_destructible_v<Foo> == false);
    static_assert(std::is_nothrow_destructible<Foo>() == true);
    static_assert(std::is_trivially_destructible<Bar>{} == true);
    
    int main() {}
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2049](<https://cplusplus.github.io/LWG/issue2049>) | C++11 | a especificação estava incompleta devido à struct de empacotamento imaginária | tornada completa

### Veja também

[ is_constructibleis_trivially_constructibleis_nothrow_constructible](<#/doc/types/is_constructible>)(C++11)(C++11)(C++11) | verifica se um tipo possui um construtor para argumentos específicos
(template de classe)
[ has_virtual_destructor](<#/doc/types/has_virtual_destructor>)(C++11) | verifica se um tipo possui um destrutor virtual
(template de classe)
[ destructible](<#/doc/concepts/destructible>)(C++20) | especifica que um objeto do tipo pode ser destruído
(concept)
[ destructor ](<#/doc/language/destructor>) | libera recursos reivindicados