# operator&lt;&lt;,&gt;&gt;(std::basic_string)

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
template< class CharT, class Traits, class Allocator >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os,
const std::basic_string<CharT, Traits, Allocator>& str );
template< class CharT, class Traits, class Allocator >
std::basic_istream<CharT, Traits>&
operator>>( std::basic_istream<CharT, Traits>& is,
std::basic_string<CharT, Traits, Allocator>& str );
```

1) Comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, [determina o preenchimento do formato de saída](<#/doc/named_req/FormattedOutputFunction>).

Em seguida, insere cada caractere da sequência resultante `seq` (o conteúdo de `str` mais o preenchimento) no fluxo de saída `os` como se chamasse `os.rdbuf()->sputn(seq, n)`, onde `n` é [std::max](<#/doc/algorithm/max>)(os.width(), str.size()) Finalmente, chama `os.width(0)` para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

Equivalente a `return os << [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>(str);`. | (desde C++17)

2) Comporta-se como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela, que pode pular espaços em branco iniciais, primeiro limpa `str` com `str.erase()`, então lê caracteres de `is` e os anexa a `str` como se por `str.append(1, c)`, até que uma das seguintes condições se torne verdadeira:

  * `N` caracteres são lidos, onde `N` é `is.width()` se `is.width() > 0`, caso contrário `N` é `str.max_size()`,
  * a condição de fim de arquivo ocorre no fluxo `is`, ou
  * [std::isspace](<#/doc/string/byte/isspace>)(c, is.getloc()) é verdadeiro para o próximo caractere `c` em `is` (este caractere de espaço em branco permanece no fluxo de entrada).

Se nenhum caractere for extraído, então `std::ios::failbit` é definido em `is`, o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>).

Finalmente, chama `is.width(0)` para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

### Exceções

1) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) se uma exceção for lançada durante a saída.

2) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) se nenhum caractere for extraído de `is` (por exemplo, o fluxo está no fim do arquivo, ou consiste apenas em espaços em branco), ou se uma exceção for lançada durante a entrada.

### Parâmetros

- **os** — um fluxo de saída de caracteres
- **is** — um fluxo de entrada de caracteres
- **str** — a string a ser inserida ou extraída

### Valor de retorno

1) `os`

2) `is`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <string>
    
    int main()
    {
        std::string greeting = "Hello, whirled!";
        std::istringstream iss(greeting);
    
        std::string hello_comma, whirled, word;
    
        iss >> hello_comma;
        iss >> whirled;
    
        std::cout << greeting << '\n'
                  << hello_comma << '\n' << whirled << '\n';
    
        // Reset the stream
        iss.clear();
        iss.seekg(0);
    
        while (iss >> word)
            std::cout << '+' << word << '\n';
    }
```

Saída:
```
    Hello, whirled!
    Hello,
    whirled!
    +Hello,
    +whirled!
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 25](<https://cplusplus.github.io/LWG/issue25>) | C++98 | `n` era o menor entre `os.width()` e `str.size()` | `n` é o maior deles
[LWG 90](<https://cplusplus.github.io/LWG/issue90>) | C++98 | [std::isspace](<#/doc/string/byte/isspace>)(c, getloc()) era usado para verificar espaços, mas `getloc` não é declarado em [`<string>`](<#/doc/header/string>) | `getloc()` substituído por `is.getloc()`
[LWG 91](<https://cplusplus.github.io/LWG/issue91>) | C++98 | `operator>>` não se comportava como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>) | comporta-se como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>)
[LWG 211](<https://cplusplus.github.io/LWG/issue211>) | C++98 | `operator>>` não definia `failbit` se nenhum caractere fosse extraído | define `failbit`
[LWG 435](<https://cplusplus.github.io/LWG/issue435>) | C++98 | caracteres eram inseridos por `os.rdbuf()->sputn(str.data(), n)`, e a resolução do [LWG issue 25](<https://cplusplus.github.io/LWG/issue25>) tornava o comportamento indefinido se `os.width()` fosse maior que `str.size()` | determina o preenchimento primeiro e insere a sequência de caracteres preenchida em vez disso
[LWG 586](<https://cplusplus.github.io/LWG/issue586>) | C++98 | `operator<<` não se comportava como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>) | comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>)

### Veja também

[ operator<<](<#/doc/string/basic_string_view/operator_ltlt>)(C++17) | realiza saída de fluxo em string views (modelo de função)