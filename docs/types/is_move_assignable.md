# std::is_move_assignable, std::is_trivially_move_assignable, std::is_nothrow_move_assignable

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_move_assignable;
template< class T >
struct is_trivially_move_assignable;
template< class T >
struct is_nothrow_move_assignable;
Trait de tipo
`T` é um tipo referenciável
(1)
(2)
(3)
```

Se `T` não for um tipo completo, (possivelmente cv-qualificado) void, ou um array de tamanho desconhecido, o comportamento é indefinido.

Se uma instanciação de um template acima depender, direta ou indiretamente, de um tipo incompleto, e essa instanciação puder produzir um resultado diferente se esse tipo fosse hipoteticamente completado, o comportamento é indefinido.

Se o programa adicionar especializações para qualquer um dos templates descritos nesta página, o comportamento é indefinido.

### Templates de variáveis auxiliares

```cpp
template< class T >
inline constexpr bool is_move_assignable_v =
is_move_assignable<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_trivially_move_assignable_v =
is_trivially_move_assignable<T>::value;  // (desde C++17)
template< class T >
inline constexpr bool is_nothrow_move_assignable_v =
is_nothrow_move_assignable<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | true se `T` for move-assignable, false caso contrário
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
    struct is_move_assignable
        : std::is_assignable<typename std::add_lvalue_reference<T>::type,
                             typename std::add_rvalue_reference<T>::type> {};
     
    template<class T>
    struct is_trivially_move_assignable
        : std::is_trivially_assignable<typename std::add_lvalue_reference<T>::type,
                                       typename std::add_rvalue_reference<T>::type> {};
     
    template<class T>
    struct is_nothrow_move_assignable
        : std::is_nothrow_assignable<typename std::add_lvalue_reference<T>::type,
                                     typename std::add_rvalue_reference<T>::type> {};
```

---

### Notas

O trait `std::is_move_assignable` é menos rigoroso que [MoveAssignable](<#/doc/named_req/MoveAssignable>) porque não verifica o tipo do resultado da atribuição (que, para um tipo [MoveAssignable](<#/doc/named_req/MoveAssignable>), deve ser `T&`), nem o requisito semântico de que o valor do alvo após a atribuição seja equivalente ao valor da origem antes da atribuição.

O tipo não precisa implementar um [operador de atribuição de movimento](<#/doc/language/move_operator>) para satisfazer este trait; veja [MoveAssignable](<#/doc/named_req/MoveAssignable>) para detalhes.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <type_traits>
     
    struct Foo { int n; };
     
    struct NoMove
    {
        // prevents implicit declaration of default move assignment operator
        // however, the class is still move-assignable because its
        // copy assignment operator can bind to an rvalue argument
        NoMove& operator=(const NoMove&) { return *this; }
    };
     
    int main()
    {
        std::cout << std::boolalpha
                  << "std::string is nothrow move-assignable? "
                  << std::is_nothrow_move_assignable<std::string>::value << '\n'
                  << "int[2] is move-assignable? "
                  << std::is_move_assignable<int[2]>::value << '\n'
                  << "Foo is trivially move-assignable? "
                  << std::is_trivially_move_assignable<Foo>::value << '\n'
                  << "NoMove is move-assignable? "
                  << std::is_move_assignable<NoMove>::value << '\n'
                  << "NoMove is nothrow move-assignable? "
                  << std::is_nothrow_move_assignable<NoMove>::value << '\n';
    }
```

Saída:
```
    std::string is nothrow move-assignable? true
    int[2] is move-assignable? false
    Foo is trivially move-assignable? true
    NoMove is move-assignable? true
    NoMove is nothrow move-assignable? false
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2196](<https://cplusplus.github.io/LWG/issue2196>) | C++11 | o comportamento era incerto se T&& não pudesse ser formado | o valor produzido é false neste caso

### Veja também

[ is_assignableis_trivially_assignableis_nothrow_assignable](<#/doc/types/is_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição para um argumento específico
(template de classe)
[ is_copy_assignableis_trivially_copy_assignableis_nothrow_copy_assignable](<#/doc/types/is_copy_assignable>)(C++11)(C++11)(C++11) | verifica se um tipo possui um operador de atribuição de cópia
(template de classe)