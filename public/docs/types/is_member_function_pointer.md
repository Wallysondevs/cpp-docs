# std::is_member_function_pointer

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_member_function_pointer;
```

`std::is_member_function_pointer` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Verifica se `T` é um ponteiro para função membro não estática. Fornece a constante membro `value` que é igual a `true` se `T` é um tipo de ponteiro para função membro não estática. Caso contrário, `value` é igual a `false`.

Se o programa adicionar especializações para `std::is_member_function_pointer` ou `std::is_member_function_pointer_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Modelo de variável auxiliar

```cpp
template< class T >
constexpr bool is_member_function_pointer_v =
is_member_function_pointer<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` é um tipo de ponteiro para função membro, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`

### Tipos membro

Type | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Possível implementação
```
    template<class T>
    struct is_member_function_pointer_helper : std::false_type {};

    template<class T, class U>
    struct is_member_function_pointer_helper<T U::*> : std::is_function<T> {};

    template<class T>
    struct is_member_function_pointer
        : is_member_function_pointer_helper<typename std::remove_cv<T>::type> {};
```

---

### Exemplo

Execute este código
```
    #include <type_traits>

    class A
    {
    public:
        void member() {}
    };

    int main()
    {
        // falha em tempo de compilação se A::member for um membro de dados e não uma função
        static_assert(std::is_member_function_pointer<decltype(&A::member)>::value,
                      "A::member is not a member function.");
    }
```

### Veja também

[ is_pointer](<#/doc/types/is_pointer>)(C++11) | verifica se um tipo é um tipo de ponteiro
(modelo de classe)
[ is_member_object_pointer](<#/doc/types/is_member_object_pointer>)(C++11) | verifica se um tipo é um ponteiro para objeto membro não estático
(modelo de classe)
[ is_member_pointer](<#/doc/types/is_member_pointer>)(C++11) | verifica se um tipo é um ponteiro para função membro não estática ou objeto
(modelo de classe)