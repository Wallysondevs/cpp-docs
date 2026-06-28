# std::ref, std::cref

Definido no cabeçalho `[<functional>](<#/doc/header/functional>)`

```c
template< class T >
std::reference_wrapper<T> ref( T& t ) noexcept;
(constexpr desde C++20)
template< class T >
std::reference_wrapper<T>
ref( std::reference_wrapper<T> t ) noexcept;
(constexpr desde C++20)
template< class T >
void ref( const T&& ) = delete;
template< class T >
std::reference_wrapper<const T> cref( const T& t ) noexcept;
(constexpr desde C++20)
template< class T >
std::reference_wrapper<const T>
cref( std::reference_wrapper<T> t ) noexcept;
(constexpr desde C++20)
template< class T >
void cref( const T&& ) = delete;
```

Os function templates `ref` e `cref` são funções auxiliares que geram um objeto do tipo [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>), usando [dedução de argumento de template](<#/doc/language/template_argument_deduction>) para determinar o argumento de template do resultado.

`T` pode ser um tipo incompleto. | (desde C++20)

### Parâmetros

- **t** — referência lvalue para o objeto que precisa ser encapsulado ou uma instância de [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)

### Valor de retorno

1) [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;T&gt;(t)

2) t

4) [std::reference_wrapper](<#/doc/utility/functional/reference_wrapper>)&lt;const T&gt;(t)

5) t

3,6) o wrapper de referência rvalue é deletado.

### Exemplo

Executar este código
```cpp
    #include <functional>
    #include <iostream>
     
    void f(int& n1, int& n2, const int& n3)
    {
        std::cout << "In function: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
        ++n1; // increments the copy of n1 stored in the function object
        ++n2; // increments the main()'s n2
        // ++n3; // compile error
    }
     
    int main()
    {
        int n1 = 1, n2 = 2, n3 = 3;
        std::function<void()> bound_f = std::bind(f, n1, std::ref(n2), std::cref(n3));
        n1 = 10;
        n2 = 11;
        n3 = 12;
        std::cout << "Before function: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
        bound_f();
        std::cout << "After function: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
    }
```

Saída:
```
    Before function: 10 11 12
    In function: 1 11 12
    After function: 10 12 12
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3146](<https://cplusplus.github.io/LWG/issue3146>) | C++11 | sobrecargas de "unwrapping" às vezes levavam a erro | tornadas sempre válidas

### Ver também

[ reference_wrapper](<#/doc/utility/functional/reference_wrapper>)(C++11) | [wrapper de referência CopyConstructible e CopyAssignable](<#/doc/named_req/CopyConstructible>)
(modelo de classe)