# std::ctype&lt;char&gt;::scan_is

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
const char* scan_is( mask m, const char* beg, const char* end ) const;
```

Localiza o primeiro caractere no array de caracteres `[`beg`, `end`)` que satisfaz a máscara de classificação m, ou seja, o primeiro caractere `c` tal que table()[(unsigned char) c] & m retornaria true.

Se (unsigned char)c >= [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;::table_size, então um valor definido pela implementação é substituído em vez de table()[(unsigned char)c], possivelmente diferente para diferentes valores de c.

### Parâmetros

- **m** — máscara a ser procurada
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a ser pesquisado
- **end** — ponteiro um-depois-do-final para o array de caracteres a ser pesquisado

### Valor de retorno

Ponteiro para o primeiro caractere em `[`beg`, `end`)` que satisfaz a máscara, ou end se nenhum caractere desse tipo for encontrado.

### Notas

Ao contrário do template primário [std::ctype](<#/doc/locale/ctype>), esta especialização não executa uma chamada de função virtual ao classificar caracteres. Para personalizar o comportamento, uma classe derivada pode fornecer uma tabela de classificação não padrão ao construtor da classe base.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
    
    int main()
    {
        std::locale loc("");
        auto& f = std::use_facet<std::ctype<char>>(loc);
    
        // skip until the first letter
        char s1[] = "      \t\t\n  Test";
        const char* p1 = f.scan_is(std::ctype_base::alpha, std::begin(s1), std::end(s1));
        std::cout << '\'' << p1 << "'\n";
    
        // skip until the first letter
        char s2[] = "123456789abcd";
        const char* p2 = f.scan_is(std::ctype_base::alpha, std::begin(s2), std::end(s2));
        std::cout << '\'' << p2 << "'\n";
    }
```

Saída:
```
    'Test'
    'abcd'
```

### Veja também

[ do_scan_is](<#/doc/locale/ctype/scan_is>)[virtual] | localiza o primeiro caractere em uma sequência que está em conformidade com uma dada classificação
(função membro virtual protegida de `std::ctype<CharT>`)
[ scan_not](<#/doc/locale/ctype_char/scan_not>) | localiza o primeiro caractere em uma sequência que falha em uma dada classificação, usando a tabela de classificação
(função membro pública)
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
* [Padrão]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão