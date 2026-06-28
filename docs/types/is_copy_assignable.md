# std::is_copy_assignable, std::is_trivially_copy_assignable, std::is_nothrow_copy_assignable

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_copy_assignable;
template< class T >
struct is_trivially_copy_assignable;
template< class T >
struct is_nothrow_copy_assignable;
Trait de tipo
`T` é um tipo referenciável
(1)
(2)
(3)
```

Se `T` não for um tipo completo, (possivelmente cv-qualificado) void, ou um array de limite desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação puder produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T >
inline constexpr bool is_copy_assignable_v =
is_copy_assignable<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_trivially_copy_assignable_v =
is_trivially_copy_assignable<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_nothrow_copy_assignable_v =
is_nothrow_copy_assignable<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for copy-assignable, false caso contrário
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

### Possível implementação
```cpp
    template<class T>
    struct is_copy_assignable
        : std::is_assignable<typename std::add_lvalue_reference<T>::type,
                             typename std::add_lvalue_reference<const T>::type> {};
    
    template<class T>
    struct is_trivially_copy_assignable
        : std::is_trivially_assignable<typename std::add_lvalue_reference<T>::type,
                                       typename std::add_lvalue_reference<const T>::type> {};
    
    template<class T>
    struct is_nothrow_copy_assignable
        : std::is_nothrow_assignable<typename std::add_lvalue_reference<T>::type,
                                     typename std::add_lvalue_reference<const T>::type> {};
```

---

### Notas

O trait `std::is_copy_assignable` é menos rigoroso que [CopyAssignable](<#/doc/named_req/CopyAssignable>) porque não verifica o tipo do resultado da atribuição (que, para um tipo [CopyAssignable](<#/doc/named_req/CopyAssignable>), deve ser um lvalue do tipo `T`) e não verifica o requisito semântico de que a expressão do argumento permanece inalterada. Ele também não verifica se `T` satisfaz [MoveAssignable](<#/doc/named_req/MoveAssignable>), o que é exigido de todos os tipos [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <type_traits>
    #include <utility>
    
    struct Foo { int n; };
    
    int main()
    {
        std::cout << std::boolalpha
                  << "Foo is trivially copy-assignable? "
                  << std::is_trivially_copy_assignable<Foo>::value << '\n'
                  << "int[2] is copy-assignable? "
                  << std::is_copy_assignable<int[2]>::value << '\n'
                  << "int is nothrow copy-assignable? "
                  << std::is_nothrow_copy_assignable<int>::value << '\n';
    }
```

Saída:
```
    Foo is trivially copy-assignable? true
    int[2] is copy-assignable? false
    int is nothrow copy-assignable? true
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2196](<https://cplusplus.github.io/LWG/issue2196>) | C++11 | o comportamento era incerto se const T& não pudesse ser formado | o valor produzido é false neste caso

### Veja também

[ is_assignableis_trivially_assignableis_nothrow_assignable](<#/doc/types/is_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição para um argumento específico
(template de classe)
[ is_move_assignableis_trivially_move_assignableis_nothrow_move_assignable](<#/doc/types/is_move_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição por movimento
(template de classe)