# std::move

Definido no cabeçalho `[<utility>](<#/doc/header/utility>)`

```c
template< class T >
typename std::remove_reference<T>::type&& move( T&& t ) noexcept;
(até C++14)
template< class T >
constexpr std::remove_reference_t<T>&& move( T&& t ) noexcept;
```

`std::move` é usado para _indicar_ que um objeto t pode ser "movido de", ou seja, permitindo a transferência eficiente de recursos de t para outro objeto.

Em particular, `std::move` produz uma [expressão xvalue](<#/doc/language/value_category>) que identifica seu argumento t. É exatamente equivalente a um `static_cast` para um tipo de referência rvalue.

### Parâmetros

- **t** — o objeto a ser movido

### Valor de retorno

static_cast<typename [std::remove_reference](<#/doc/types/remove_reference>)&lt;T&gt;::type&&>(t)

### Notas

As funções que aceitam parâmetros de referência rvalue (incluindo [construtores de movimento](<#/doc/language/move_constructor>), [operadores de atribuição de movimento](<#/doc/language/move_operator>) e funções membro regulares como [std::vector::push_back](<#/doc/container/vector/push_back>)) são selecionadas, por [resolução de sobrecarga](<#/doc/language/overload_resolution>), quando chamadas com argumentos [rvalue](<#/doc/language/value_category>) (sejam [prvalues](<#/doc/language/value_category>) como um objeto temporário ou [xvalues](<#/doc/language/value_category>) como o produzido por `std::move`). Se o argumento identifica um objeto que possui recursos, essas sobrecargas têm a opção, mas não são obrigadas, de _mover_ quaisquer recursos mantidos pelo argumento. Por exemplo, um construtor de movimento de uma lista encadeada pode copiar o ponteiro para o início da lista e armazenar nullptr no argumento em vez de alocar e copiar nós individuais.

Nomes de variáveis de [referência rvalue](<#/doc/language/reference>) são [lvalues](<#/doc/language/value_category>) e precisam ser convertidos para [xvalues](<#/doc/language/value_category>) para serem vinculados às sobrecargas de função que aceitam parâmetros de referência rvalue, razão pela qual [construtores de movimento](<#/doc/language/move_constructor>) e [operadores de atribuição de movimento](<#/doc/language/move_operator>) tipicamente usam `std::move`:
```cpp
    // Construtor de movimento simples
    A(A&& arg) : member(std::move(arg.member)) // a expressão "arg.member" é um lvalue
    {}
    
    // Operador de atribuição de movimento simples
    A& operator=(A&& other)
    {
        member = std::move(other.member);
        return *this;
    }
```

Uma exceção é quando o tipo do parâmetro da função é uma [referência de encaminhamento](<#/doc/language/reference>) (que se parece com uma referência rvalue para um parâmetro de tipo template), caso em que [std::forward](<#/doc/utility/forward>) é usado em vez disso.

A menos que especificado de outra forma, todos os objetos da standard library que foram movidos são colocados em um "estado válido, mas não especificado", o que significa que os invariantes da classe do objeto são mantidos (assim, funções sem pré-condições, como o operador de atribuição, podem ser usadas com segurança no objeto depois que ele foi movido):
```cpp
    std::vector<std::string> v;
    std::string str = "example";
    v.push_back(std::move(str)); // str agora é válido, mas não especificado
    str.back(); // comportamento indefinido se size() == 0: back() tem uma pré-condição !empty()
    if (!str.empty())
        str.back(); // OK, empty() não tem pré-condição e a pré-condição de back() é atendida
    
    str.clear(); // OK, clear() não tem pré-condições
```

Além disso, as funções da standard library chamadas com argumentos xvalue podem assumir que o argumento é a única referência ao objeto; se ele foi construído a partir de um lvalue com `std::move`, nenhuma verificação de aliasing é feita. No entanto, a autoatribuição de movimento de tipos da standard library é garantida para colocar o objeto em um estado válido (mas geralmente não especificado):
```cpp
    std::vector<int> v = {2, 3, 3};
    v = std::move(v); // o valor de v é não especificado
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <string>
    #include <utility>
    #include <vector>
    
    int main()
    {
        std::string str = "Salut";
        std::vector<std::string> v;
    
        // usa a sobrecarga push_back(const T&), o que significa
        // que teremos o custo de copiar str
        v.push_back(str);
        std::cout << "Após a cópia, str é " << std::quoted(str) << '\n';
    
        // usa a sobrecarga push_back(T&&) de referência rvalue,
        // o que significa que nenhuma string será copiada; em vez disso, o conteúdo
        // de str será movido para o vetor. Isso é menos
        // custoso, mas também significa que str pode agora estar vazio.
        v.push_back(std::move(str));
        std::cout << "Após o movimento, str é " << std::quoted(str) << '\n';
    
        std::cout << "O conteúdo do vetor é {" << std::quoted(v[0])
                  << ", " << std::quoted(v[1]) << "}\n";
    }
```

Saída possível:
```
    After copy, str is "Salut"
    After move, str is ""
    The contents of the vector are {"Salut", "Salut"}
```

### Veja também

[ forward](<#/doc/utility/forward>)(C++11) | encaminha um argumento de função e usa o argumento de tipo template para preservar sua categoria de valor
(modelo de função)
[ move_if_noexcept](<#/doc/utility/move_if_noexcept>)(C++11) | converte o argumento para um xvalue se o construtor de movimento não lançar exceção
(modelo de função)
[ move](<#/doc/algorithm/move>)(C++11) | move um range de elementos para um novo local
(modelo de função)