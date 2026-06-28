# std::ctype&lt;char&gt;::scan_not

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
const char* scan_not( mask m, const char* beg, const char* end ) const;
```

Localiza o primeiro caractere no array de caracteres `[`beg`, `end`)` que não satisfaz a máscara de classificação m, isto é, o primeiro caractere `c` tal que table()[(unsigned char)c] & m retornaria `false`.

Se (unsigned char)c >= [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;::table_size, então um valor definido pela implementação é substituído em vez de table()[(unsigned char)c], possivelmente diferente para diferentes valores de c.

### Parâmetros

- **m** — máscara a ser procurada
- **beg** — ponteiro para o primeiro caractere em um array de caracteres a ser pesquisado
- **end** — ponteiro para um elemento após o final do array de caracteres a ser pesquisado

### Valor de retorno

Ponteiro para o primeiro caractere em `[`beg`, `end`)` que não satisfaz a máscara, ou `end` se nenhum caractere desse tipo for encontrado.

### Observações

Ao contrário do template primário [std::ctype](<#/doc/locale/ctype>), esta especialização não realiza uma chamada de função virtual ao classificar caracteres. Para personalizar o comportamento, uma classe derivada pode fornecer uma tabela de classificação não padrão ao construtor da classe base.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
     
    int main()
    {
        auto& f = std::use_facet<std::ctype<char>>(std::locale());
     
        // skip leading whitespace
        char s1[] = "      \t\t\n  Test";
        const char* p1 = f.scan_not(std::ctype_base::space, std::begin(s1), std::end(s1));
        std::cout << '\'' << p1 << "'\n";
     
        // skip leading digits
        char s2[] = "123456789abcd";
        const char* p2 = f.scan_not(std::ctype_base::digit, std::begin(s2), std::end(s2));
        std::cout << '\'' << p2 << "'\n";
    }
```

Saída:
```
    'Test'
    'abcd'
```

### Veja também

[ do_scan_not](<#/doc/locale/ctype/scan_not>)[virtual] | localiza o primeiro caractere em uma sequência que falha na classificação fornecida
(função membro virtual protegida de `std::ctype<CharT>`)
[ scan_is](<#/doc/locale/ctype_char/scan_is>) | localiza o primeiro caractere em uma sequência que está em conformidade com a classificação fornecida, usando a tabela de classificação
(função membro pública)