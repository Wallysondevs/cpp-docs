# std::basic_istream&lt;CharT,Traits&gt;::get

```cpp
int_type get();  // (1)
basic_istream& get( char_type& ch );  // (2)
basic_istream& get( char_type* s, std::streamsize count );  // (3)
basic_istream& get( char_type* s, std::streamsize count, char_type delim );  // (4)
basic_istream& get( basic_streambuf& strbuf );  // (5)
basic_istream& get( basic_streambuf& strbuf, char_type delim );  // (6)
```

Extrai um caractere ou caracteres do stream.

Todas as versões se comportam como [UnformattedInputFunctions](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentry, essas funções realizam o seguinte:

1) Lê um caractere e o retorna se disponível. Caso contrário, retorna Traits::eof() e define [failbit](<#/doc/io/ios_base/iostate>) e [eofbit](<#/doc/io/ios_base/iostate>).

2) Lê um caractere e o armazena em ch se disponível. Caso contrário, deixa ch inalterado e define [failbit](<#/doc/io/ios_base/iostate>) e [eofbit](<#/doc/io/ios_base/iostate>). Note que esta função não é sobrecarregada para os tipos signed char e unsigned char, ao contrário do operador de entrada de caractere formatado operator>>.

3) O mesmo que get(s, count, widen('\n')), ou seja, lê no máximo [std::max](<#/doc/algorithm/max>)(0, count - 1) caracteres e os armazena na string de caracteres apontada por s até que '\n' seja encontrado.

4) Lê caracteres e os armazena nas localizações sucessivas do array de caracteres cujo primeiro elemento é apontado por s. Os caracteres são extraídos e armazenados até que qualquer um dos seguintes ocorra:

  * count é menor que 1 ou count - 1 caracteres foram armazenados.
  * ocorre uma condição de fim de arquivo na sequência de entrada (setstate(eofbit) é chamado).
  * o próximo caractere de entrada disponível c é igual a delim, conforme determinado por Traits::eq(c, delim). Este caractere não é extraído (ao contrário de [`getline()`](<#/doc/io/basic_istream/getline>)).

Em qualquer caso, se count > 0, um caractere nulo (CharT() é armazenado na próxima localização sucessiva do array.

5) O mesmo que get(strbuf, widen('\n')), ou seja, lê os caracteres disponíveis e os insere no objeto [`basic_streambuf`](<#/doc/io/basic_streambuf>) fornecido até que '\n' seja encontrado.

6) Lê caracteres e os insere na sequência de saída controlada pelo objeto [`basic_streambuf`](<#/doc/io/basic_streambuf>) fornecido. Os caracteres são extraídos e inseridos em strbuf até que qualquer um dos seguintes ocorra:

  * ocorre uma condição de fim de arquivo na sequência de entrada.
  * a inserção na sequência de saída falha (neste caso, o caractere que não pôde ser inserido não é extraído).
  * o próximo caractere de entrada disponível c é igual a delim, conforme determinado por Traits::eq(c, delim). Este caractere não é extraído.
  * ocorre uma exceção (neste caso, a exceção é capturada e não relançada).

Se nenhum caractere foi extraído, chama setstate(failbit).

Todas as versões definem o valor de [gcount()](<#/doc/io/basic_istream/gcount>) para o número de caracteres extraídos.

### Parâmetros

- **ch** — referência para o caractere onde o resultado será escrito
- **s** — ponteiro para a string de caracteres onde os caracteres serão armazenados
- **count** — tamanho da string de caracteres apontada por s
- **delim** — caractere delimitador para parar a extração. Ele não é extraído nem armazenado
- **strbuf** — buffer de stream para ler o conteúdo

### Valor de retorno

1) O caractere extraído ou Traits::eof().

2-6) *this

### Exceções

[failure](<#/doc/io/ios_base/failure>) se ocorreu um erro (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar para esse estado.

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada.

### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::istringstream s1("Hello, world.");
        char c1 = s1.get(); // reads 'H'
        std::cout << "after reading " << c1 << ", gcount() == " <<  s1.gcount() << '\n';
     
        char c2;
        s1.get(c2);         // reads 'e'
        char str[5];
        s1.get(str, 5);     // reads "llo,"
        std::cout << "after reading " << str << ", gcount() == " <<  s1.gcount() << '\n';
     
        std::cout << c1 << c2 << str;
        s1.get(*std::cout.rdbuf()); // reads the rest, not including '\n'
        std::cout << "\nAfter the last get(), gcount() == " << s1.gcount() << '\n';
    }
```

Output:
```
    after reading H, gcount() == 1
    after reading llo,, gcount() == 4
    Hello, world.
    After the last get(), gcount() == 7
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 370](<https://cplusplus.github.io/LWG/issue370>) | C++98 | o efeito da sobrecarga (5) era get(s, count, widen('\n')), que é o efeito da sobrecarga (3) | corrigido para get(strbuf, widen('\n'))
[LWG 531](<https://cplusplus.github.io/LWG/issue531>) | C++98 | as sobrecargas (3,4) não conseguiam lidar com o caso em que count é não-positivo | nenhum caractere é extraído neste caso

### Ver também

[ read](<#/doc/io/basic_istream/read>) | extrai blocos de caracteres
(função membro pública)
[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) | extrai dados formatados
(função membro pública)
[ operator>>(std::basic_istream)](<#/doc/io/basic_istream/operator_gtgt2>) | extrai caracteres e arrays de caracteres
(template de função)