# std::basic_istream&lt;CharT,Traits&gt;::getline

basic_istream& getline( char_type* s, [std::streamsize](<#/doc/io/streamsize>) count ); | (1) |
---|---|---
basic_istream& getline( char_type* s, [std::streamsize](<#/doc/io/streamsize>) count, char_type delim ); | (2) |

Extrai caracteres do stream até o fim da linha ou o delimitador especificado `delim`.

A primeira sobrecarga é equivalente a `getline(s, count, widen('\n'))`.

Comporta-se como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela, extrai caracteres de `*this` e os armazena em locais sucessivos do array cujo primeiro elemento é apontado por `s`, até que qualquer um dos seguintes ocorra (testado na ordem mostrada):

1.  a condição de fim de arquivo ocorre na sequência de entrada.
2.  o próximo caractere disponível `c` é o delimitador, conforme determinado por `Traits::eq(c, delim)`. O delimitador é extraído (ao contrário de [`basic_istream::get()`](<#/doc/io/basic_istream/get>)) e contado para [gcount()](<#/doc/io/basic_istream/gcount>), mas não é armazenado.
3.  `count` é não-positivo, ou `count - 1` caracteres foram extraídos (`setstate(failbit)` é chamado neste caso).

Se a função não extrair nenhum caractere, `failbit` é definido no estado de erro local antes que [`setstate()`](<#/doc/io/basic_ios/setstate>) seja chamado.

Em qualquer caso, se `count > 0`, ele então armazena um caractere nulo `CharT()` no próximo local sucessivo do array e atualiza [gcount()](<#/doc/io/basic_istream/gcount>).

### Notas

Como a condição #2 é testada antes da condição #3, a linha de entrada que se encaixa exatamente no buffer não aciona `failbit`.

Como o caractere de terminação é contado como um caractere extraído, uma linha de entrada vazia não aciona `failbit`.

### Parâmetros

- **s** — ponteiro para a string de caracteres onde os caracteres serão armazenados
- **count** — tamanho da string de caracteres apontada por `s`
- **delim** — caractere delimitador para parar a extração. Ele é extraído, mas não armazenado.

### Valor de retorno

`*this`

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceções para esse estado.

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada.

### Exemplo

Execute este código
```cpp
    #include <array>
    #include <iostream>
    #include <sstream>
    #include <vector>
    
    int main()
    {
        std::istringstream input("abc|def|gh");
        std::vector<std::array<char, 4>> v;
    
        // note: the following loop terminates when std::ios_base::operator bool()
        // on the stream returned from getline() returns false
        for (std::array<char, 4> a; input.getline(&a[0], 4, '|');)
            v.push_back(a);
    
        for (auto& a : v)
            std::cout << &a[0] << '\n';
    }
```

Saída:
```
    abc
    def
    gh
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 531](<https://cplusplus.github.io/LWG/issue531>) | C++98 | `std::getline` não conseguia lidar com o caso em que `count` é não-positivo | nenhum caractere é extraído neste caso

### Veja também

[ getline](<#/doc/string/basic_string/getline>) | lê dados de um stream de E/S para uma string
(modelo de função)
[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) | extrai dados formatados
(função membro pública)
[ get](<#/doc/io/basic_istream/get>) | extrai caracteres
(função membro pública)
[ read](<#/doc/io/basic_istream/read>) | extrai blocos de caracteres
(função membro pública)