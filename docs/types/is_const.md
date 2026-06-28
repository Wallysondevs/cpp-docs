# std::is_const

Definido no cabeçalho `[<type_traits>](<#/doc/header/type_traits>)`

```c
template< class T >
struct is_const;
```

`std::is_const` é um [UnaryTypeTrait](<#/doc/named_req/UnaryTypeTrait>).

Se `T` é um tipo qualificado como const (ou seja, const, ou const volatile), fornece a constante membro `value` igual a `true`. Para qualquer outro tipo, `value` é `false`.

Se o programa adicionar especializações para `std::is_const` ou `std::is_const_v`, o comportamento é indefinido.

### Parâmetros de template

- **T** — um tipo a ser verificado

### Template de variável auxiliar

```cpp
template< class T >
constexpr bool is_const_v = is_const<T>::value;  // (desde C++17)
```

## Herdado de [ std::integral_constant](<#/doc/types/integral_constant>)

### Constantes membro

value[static] | `true` se `T` é um tipo qualificado como const, `false` caso contrário
(constante membro estática pública)

### Funções membro

operator bool | converte o objeto para `bool`, retorna `value`
(função membro pública)
operator()(C++14) | retorna `value`
(função membro pública)

### Tipos membro

Tipo | Definição
---|---
`value_type` | bool
`type` | [std::integral_constant](<#/doc/types/integral_constant>)<bool, value>

### Notas

Se `T` é um tipo de referência, então `is_const<T>::value` é sempre `false`. A maneira correta de verificar a constness de um tipo potencialmente de referência é remover a referência: `is_const<typename remove_reference<T>::type>`.

### Implementação possível
```cpp
    template<class T> struct is_const          : std::false_type {};
    template<class T> struct is_const<const T> : std::true_type {};
```

---

### Exemplo

Execute este código
```cpp
    #include <type_traits>
    
    static_assert(std::is_same_v<const int*, int const*>,
        "Lembre-se, a constness se liga fortemente dentro de ponteiros.");
    static_assert(!std::is_const_v<int>);
    static_assert(std::is_const_v<const int>);
    static_assert(!std::is_const_v<int*>);
    static_assert(std::is_const_v<int* const>,
        "Porque o próprio ponteiro não pode ser alterado, mas o int apontado pode.");
    static_assert(!std::is_const_v<const int*>,
        "Porque o próprio ponteiro pode ser alterado, mas não o int apontado.");
    static_assert(!std::is_const_v<const int&>);
    static_assert(std::is_const_v<std::remove_reference_t<const int&>>);
    
    struct S
    {
        void foo() const {}
        void bar() const {}
    };
    
    int main()
    {
        // Uma função membro const é const de uma maneira diferente:
    
        static_assert(!std::is_const_v<decltype(&S::foo)>,
            "Porque &S::foo é um ponteiro.");
    
        using S_mem_fun_ptr = void(S::*)() const;
    
        S_mem_fun_ptr sfp = &S::foo;
        sfp = &S::bar; // OK, pode ser re-apontado
        static_assert(!std::is_const_v<decltype(sfp)>,
            "Porque sfp é do mesmo tipo de ponteiro e, portanto, pode ser re-apontado.");
    
        const S_mem_fun_ptr csfp = &S::foo;
        // csfp = &S::bar; // Erro
        static_assert(std::is_const_v<decltype(csfp)>,
            "Porque csfp não pode ser re-apontado.");
    }
```

### Veja também

[ is_volatile](<#/doc/types/is_volatile>)(C++11) | verifica se um tipo é qualificado como volatile
(template de classe)
[ as_const](<#/doc/utility/as_const>)(C++17) | obtém uma referência a const para seu argumento
(template de função)