# operator&gt;&gt;(std::basic_istream)

Definido no cabeçalho `[<istream>](<#/doc/header/istream>)`

```c
template< class CharT, class Traits >
basic_istream<CharT, Traits>&
operator>>( basic_istream<CharT, Traits>& st, CharT& ch );
```

template< class Traits >
basic_istream<char, Traits>&
operator>>( basic_istream<char, Traits>& st, signed char& ch );

```cpp
template< class Traits >
basic_istream<char, Traits>&
operator>>( basic_istream<char, Traits>& st, unsigned char& ch );  // (1)
  // (2)
template< class CharT, class Traits>
basic_istream<CharT, Traits>&
operator>>( basic_istream<CharT, Traits>& st, CharT* s );
```

template< class Traits >
basic_istream<char, Traits>&
operator>>( basic_istream<char, Traits>& st, signed char* s );

template< class Traits >
basic_istream<char, Traits>&
operator>>( basic_istream<char, Traits>& st, unsigned char* s ); | | (ate C++20)
template< class CharT, class Traits, [std::size_t](<#/doc/types/size_t>) N >
basic_istream<CharT, Traits>&
operator>>( basic_istream<CharT, Traits>& st, CharT (&s)[N] );

template< class Traits, [std::size_t](<#/doc/types/size_t>) N >
basic_istream<char, Traits>&
operator>>( basic_istream<char, Traits>& st, signed char (&s)[N] );

```cpp
template< class Traits, std::size_t N >
basic_istream<char, Traits>&
operator>>( basic_istream<char, Traits>& st, unsigned char (&s)[N] );  // (desde C++20)
template< class Istream, class T >
Istream&&
operator>>( Istream&& st, T&& value );  // (3) (desde C++11)
```

1,2) Realiza operações de entrada de caracteres.

1) Comporta-se como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela, que pode pular espaços em branco iniciais, extrai um caractere e o armazena em `ch`. Se nenhum caractere estiver disponível, define [`failbit`](<#/doc/io/ios_base/iostate>) (além de [`eofbit`](<#/doc/io/ios_base/iostate>) que é definido conforme exigido por uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>)).

2) Comporta-se como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela, que pode pular espaços em branco iniciais, extrai caracteres sucessivos e os armazena em locais sucessivos de um array de caracteres cujo primeiro elemento é apontado por(ate C++20) `s`. A extração para se qualquer das seguintes condições for satisfeita:

  * Um caractere de espaço em branco (conforme determinado pela facet [`ctype<CharT>`](<#/doc/locale/ctype>)) é encontrado. O caractere de espaço em branco não é extraído.

  * Se st.width() for maior que zero, st.width() - 1 caracteres são armazenados.

| (ate C++20)

  * n - 1 caracteres são armazenados, onde n é definido como segue:

  * Se st.width() for maior que zero, [std::min](<#/doc/algorithm/min>)([std::size_t](<#/doc/types/size_t>)(st.width()), N);
  * caso contrário, n é N.

| (desde C++20)

  * Ocorre o fim do arquivo na sequência de entrada (isso também define [`eofbit`](<#/doc/io/ios_base/iostate>)).

Em ambos os casos, um caractere nulo adicional com valor CharT() é armazenado no final da saída. Se nenhum caractere foi extraído, define [`failbit`](<#/doc/io/ios_base/iostate>) (o caractere nulo ainda é escrito, na primeira posição da saída). Finalmente, chama st.width(0) para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

3) Chama o operador de extração apropriado, dada uma rvalue reference para um objeto de stream de entrada (equivalente a st >> [std::forward](<#/doc/utility/forward>)&lt;T&gt;(value)). Esta sobrecarga participa da resolução de sobrecarga apenas se st >> [std::forward](<#/doc/utility/forward>)&lt;T&gt;(value) for bem-formado e `Istream` for um tipo de classe pública e inequivocamente derivado de [std::ios_base](<#/doc/io/ios_base>).

### Notas

Extrair um único caractere que é o último caractere do stream não define `eofbit`: isso é diferente de outras funções de entrada formatada, como extrair o último inteiro com operator>>, mas este comportamento corresponde ao comportamento de [std::scanf](<#/doc/io/c/scanf>) com o especificador de formato "%c".

### Parâmetros

- **st** — stream de entrada de onde extrair os dados
- **ch** — referência para um caractere onde armazenar o caractere extraído
- **s** — ponteiro para(ate C++20) um array de caracteres onde armazenar os caracteres extraídos

### Valor de retorno

1,2) st

3) std::move(st)

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::string input = "n greetings";
        std::istringstream stream(input);
    
        char c;
        const int MAX = 6;
        char cstr[MAX];
    
        stream >> c >> std::setw(MAX) >> cstr;
        std::cout << "c = " << c << '\n'
                  << "cstr = " << cstr << '\n';
    
        double f;
        std::istringstream("1.23") >> f; // rvalue stream extraction
        std::cout << "f = " << f << '\n';
    }
```

Saída:
```
    c = n
    cstr = greet
    f = 1.23
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 13](<https://cplusplus.github.io/LWG/issue13>) | C++98 | a definição de n mencionava um nome inexistente eos | substituído por CharT()
[LWG 68](<https://cplusplus.github.io/LWG/issue68>) | C++98 | nenhum caractere nulo era armazenado no final da saída para a sobrecarga (2) | armazena um caractere nulo
[LWG 1203](<https://cplusplus.github.io/LWG/issue1203>) | C++98 | a sobrecarga para rvalue stream retornava lvalue reference para a classe base | retorna rvalue reference
para a classe derivada
[LWG 2328](<https://cplusplus.github.io/LWG/issue2328>) | C++98 | a sobrecarga para rvalue stream exigia que outro argumento fosse lvalue | feita para aceitar rvalue
---|---|---|---
[LWG 2534](<https://cplusplus.github.io/LWG/issue2534>) | C++98 | a sobrecarga para rvalue stream não era restrita | restrita

### Veja também

[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) | extrai dados formatados
(função membro pública)