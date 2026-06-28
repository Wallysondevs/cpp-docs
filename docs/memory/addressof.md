# std::addressof

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T >
T* addressof( T& arg ) noexcept;
(constexpr desde C++17)
template< class T >
const T* addressof( const T&& ) = delete;
```

1) Obtém o endereço real do objeto ou função arg, mesmo na presença de um operator& sobrecarregado.

2) A sobrecarga para rvalue é deletada para prevenir a obtenção do endereço de rvalues const.

A expressão `std::addressof(e)` é uma [subexpressão constante](<#/doc/language/constant_expression>), se e for uma subexpressão constante lvalue. | (desde C++17)

### Parâmetros

- **arg** — objeto lvalue ou função

### Valor de retorno

Ponteiro para arg.

### Implementação possível

A implementação abaixo não é constexpr, porque reinterpret_cast não é utilizável em uma expressão constante. É necessário suporte do compilador (veja abaixo).
```cpp
    template<class T>
    typename std::enable_if<std::is_object<T>::value, T*>::type addressof(T& arg) noexcept
    {
        return reinterpret_cast<T*>(
                   &const_cast<char&>(
                       reinterpret_cast<const volatile char&>(arg)));
    }
    
    template<class T>
    typename std::enable_if<!std::is_object<T>::value, T*>::type addressof(T& arg) noexcept
    {
        return &arg;
    }
```

---

A implementação correta desta função requer suporte do compilador: [GNU libstdc++](<https://github.com/gcc-mirror/gcc/blob/b8806796ec64585de39ca6ee3b7b30cc08f27d62/libstdc++-v3/include/bits/move.h#L47-L50>), [LLVM libc++](<https://github.com/llvm/llvm-project/blob/5146b57b403b3a512dc64e766695b13803ef3b54/libcxx/include/__memory/addressof.h#L21-L28>), [Microsoft STL](<https://github.com/microsoft/STL/blob/1e312b38db8df1dfbea17adc344454feb8d00dd9/stl/inc/type_traits#L1548-L1551>).

### Notas

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_addressof_constexpr`](<#/doc/feature_test>) | [`201603L`](<#/>) | (C++17) | constexpr `std::addressof`

constexpr para `addressof` é adicionado por [LWG2296](<https://cplusplus.github.io/LWG/issue2296>), e o MSVC STL aplica a mudança ao modo C++14 como um relatório de defeito.

Existem alguns casos incomuns onde o uso do operator& embutido é malformado devido a [argument-dependent lookup](<#/doc/language/adl>) mesmo que não esteja sobrecarregado, e `std::addressof` pode ser usado em seu lugar.
```cpp
    template<class T>
    struct holder { T t; };
    
    struct incomp;
    
    int main()
    {
        holder<holder<incomp>*> x{};
        // &x; // error: argument-dependent lookup attempts to instantiate holder<incomp>
        std::addressof(x); // OK
    }
```

### Exemplo

operator& pode ser sobrecarregado para uma classe wrapper de ponteiro para obter um ponteiro para ponteiro:

Execute este código
```cpp
    #include <iostream>
    #include <memory>
    
    template<class T>
    struct Ptr
    {
        T* pad; // add pad to show difference between 'this' and 'data'
        T* data;
        Ptr(T* arg) : pad(nullptr), data(arg)
        {
            std::cout << "Ctor this = " << this << '\n';
        }
    
        ~Ptr() { delete data; }
        T** operator&() { return &data; }
    };
    
    template<class T>
    void f(Ptr<T>* p)
    {
        std::cout << "Ptr   overload called with p = " << p << '\n';
    }
    
    void f(int** p)
    {
        std::cout << "int** overload called with p = " << p << '\n';
    }
    
    int main()
    {
        Ptr<int> p(new int(42));
        f(&p);                // calls int** overload
        f(std::addressof(p)); // calls Ptr<int>* overload, (= this)
    }
```

Saída possível:
```
    Ctor this = 0x7fff59ae6e88
    int** overload called with p = 0x7fff59ae6e90
    Ptr   overload called with p = 0x7fff59ae6e88
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2598](<https://cplusplus.github.io/LWG/issue2598>) | C++11 | std::addressof&lt;const T&gt; poderia obter o endereço de rvalues | impedido por uma sobrecarga deletada

### Veja também

[ allocator](<#/doc/memory/allocator>) | o alocador padrão
(modelo de classe)
[ pointer_to](<#/doc/memory/pointer_traits/pointer_to>)[static] | obtém um ponteiro desreferenciável para seu argumento
(função membro estática pública de `std::pointer_traits<Ptr>`)