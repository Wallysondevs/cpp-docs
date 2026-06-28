# std::overflow_error

Definido no cabeçalho `[<stdexcept>](<#/doc/header/stdexcept>)`

```c
class overflow_error;
```

Define um tipo de objeto a ser lançado como exceção. Pode ser usado para relatar erros de overflow aritmético (ou seja, situações em que o resultado de uma computação é muito grande para o tipo de destino).

O único componente da standard library que lança esta exceção é [`std::bitset::to_ulong`](<#/doc/utility/bitset/to_ulong>). | (até C++11)
---|---
Os únicos componentes da standard library que lançam esta exceção são [`std::bitset::to_ulong`](<#/doc/utility/bitset/to_ulong>) e [`std::bitset::to_ullong`](<#/doc/utility/bitset/to_ullong>). | (desde C++11)

As funções matemáticas dos componentes da standard library não lançam esta exceção (funções matemáticas relatam erros de overflow conforme especificado em [`math_errhandling`](<#/doc/numeric/math/math_errhandling>)). Bibliotecas de terceiros, no entanto, a utilizam. Por exemplo, [`boost.math`](<https://www.boost.org/doc/libs/release/libs/math/doc/html/math_toolkit/error_handling.html>) lança `std::overflow_error` se `boost::math::policies::throw_on_error` estiver habilitado (a configuração padrão).

Diagrama de herança

### Funções membro

(construtor) | constrói um novo objeto `overflow_error` com a mensagem fornecida
(função membro pública)
operator= | substitui o objeto `overflow_error`
(função membro pública)

## std::overflow_error::overflow_error

```cpp
overflow_error( const `std::string`& what_arg );  // (1)
overflow_error( const char* what_arg );  // (2)
overflow_error( const overflow_error& other ); | (3) | (noexcept desde C++11)
```

1) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [`std::strcmp`](<#/>)`(what(), what_arg.c_str()) == 0.`

2) Constrói o objeto de exceção com what_arg como string explicativa. Após a construção, [`std::strcmp`](<#/>)`(what(), what_arg) == 0.`

3) Construtor de cópia. Se *this e other ambos tiverem o tipo dinâmico `std::overflow_error`, então [`std::strcmp`](<#/>)`(what(), other.what()) == 0. Nenhuma exceção pode ser lançada a partir do construtor de cópia.`

### Parâmetros

- **what_arg** — string explicativa
- **other** — outro objeto de exceção para copiar

### Exceções

1,2) Pode lançar [`std::bad_alloc`](<#/doc/memory/new/bad_alloc>).

### Notas

Como a cópia de `std::overflow_error` não é permitida a lançar exceções, esta mensagem é tipicamente armazenada internamente como uma string com contagem de referências alocada separadamente. Esta é também a razão pela qual não há um construtor que aceite `std::string&&`: ele teria que copiar o conteúdo de qualquer forma.

Antes da resolução do [`LWG issue 254`](<https://cplusplus.github.io/LWG/issue254>), o construtor não-cópia só podia aceitar [`std::string`](<#/doc/string/basic_string>). Isso tornava a alocação dinâmica obrigatória para construir um objeto [`std::string`](<#/doc/string/basic_string>).

Após a resolução do [`LWG issue 471`](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um construtor de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## std::overflow_error::operator=

overflow_error& operator=( const overflow_error& other ); | | (noexcept desde C++11)

Atribui o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::overflow_error`, então [`std::strcmp`](<#/>)`(what(), other.what()) == 0 após a atribuição. Nenhuma exceção pode ser lançada a partir do operador de atribuição de cópia.`

### Parâmetros

- **other** — outro objeto de exceção para atribuir

### Valor de retorno

*this

### Notas

Após a resolução do [`LWG issue 471`](<https://cplusplus.github.io/LWG/issue471>), uma classe de exceção padrão derivada deve ter um operador de atribuição de cópia publicamente acessível. Ele pode ser implicitamente definido desde que as strings explicativas obtidas por `what()` sejam as mesmas para o objeto original e o objeto copiado.

## Herdado de [`std::runtime_error`](<#/doc/error/runtime_error>)

## Herdado de [`std::exception`](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <limits>
    #include <stdexcept>
    #include <utility>
    
    template<typename T, int N>
        requires (N > 0) /*...*/
    class Stack
    {
        int top_{-1};
        T data_[N];
    
    public:
        [[nodiscard]] bool empty() const { return top_ == -1; }
    
        void push(T x)
        {
            if (top_ == N - 1)
                throw std::overflow_error("Stack overflow!");
            data_[++top_] = std::move(x);
        }
    
        void pop()
        {
            if (empty())
                throw std::underflow_error("Stack underflow!");
            --top_;
        }
    
        T const& top() const
        {
            if (empty())
                throw std::overflow_error("Stack is empty!");
            return data_[top_];
        }
    };
    
    int main()
    {
        Stack<int, 4> st;
    
        try
        {
            [[maybe_unused]] auto x = st.top();
        }
        catch (std::overflow_error const& ex)
        {
            std::cout << "1) Exception: " << ex.what() << '\n';
        }
    
        st.push(1337);
        while (!st.empty())
        	st.pop();
    
        try
        {
            st.pop();
        }
        catch (std::underflow_error const& ex)
        {
            std::cout << "2) Exception: " << ex.what() << '\n';
        }
    
        try
        {
            for (int i{}; i != 13; ++i)
                st.push(i);
        }
        catch (std::overflow_error const& ex)
        {
            std::cout << "3) Exception: " << ex.what() << '\n';
        }
    }
```

Saída:
```
    1) Exception: Stack is empty!
    2) Exception: Stack underflow!
    3) Exception: Stack overflow!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 254](<https://cplusplus.github.io/LWG/issue254>) | C++98 | o construtor que aceita const char* estava faltando | adicionado
[LWG 471](<https://cplusplus.github.io/LWG/issue471>) | C++98 | as strings explicativas das cópias de `std::overflow_error` eram definidas pela implementação | elas são as mesmas do objeto `std::overflow_error` original