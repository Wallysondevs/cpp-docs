# std::basic_istream&lt;CharT,Traits&gt;::seekg

```cpp
basic_istream& seekg( pos_type pos );  // (1)
basic_istream& seekg( off_type off, std::ios_base::seekdir dir );  // (2)
```

Define o indicador de posição de entrada do objeto `streambuf` associado atual.

Antes de fazer qualquer outra coisa, `seekg` limpa `eofbit`. | (desde C++11)

`seekg` se comporta como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>), exceto que [gcount()](<#/doc/io/basic_istream/gcount>) não é afetado. Após construir e verificar o objeto sentinela,

1) se fail() != true, define o indicador de posição de entrada para o valor absoluto (relativo ao início do arquivo) `pos`. Especificamente, executa rdbuf()->pubseekpos(pos, [std::ios_base::in](<#/doc/io/ios_base/openmode>)) ([`pubseekpos`](<#/doc/io/basic_streambuf/pubseekpos>), que, por sua vez, chama `seekpos` do buffer específico, como [`basic_filebuf::seekpos`](<#/doc/io/basic_filebuf/seekpos>), [`basic_stringbuf::seekpos`](<#/doc/io/basic_stringbuf/seekpos>), ou [`strstreambuf::seekpos`](<#/doc/io/strstreambuf/seekpos>)). Em caso de falha, chama setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>)).

2) se fail() != true, define o indicador de posição de entrada para a posição `off`, relativa à posição definida por `dir`. Especificamente, executa rdbuf()->pubseekoff(off, dir, [std::ios_base::in](<#/doc/io/ios_base/openmode>)). Em caso de falha, chama setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>)).

### Parâmetros

- **pos** — posição absoluta para definir o indicador de posição de entrada
- **off** — posição relativa (positiva ou negativa) para definir o indicador de posição de entrada
- **dir** — define a posição base para aplicar o deslocamento relativo. Pode ser uma das seguintes constantes: | Constante | Explicação
---|---
[`beg`](<#/doc/io/ios_base/seekdir>) | o início de um stream
[`end`](<#/doc/io/ios_base/seekdir>) | o final de um stream
[`cur`](<#/doc/io/ios_base/seekdir>) | a posição atual do indicador de posição do stream

### Valor de retorno

*this

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceção para esse estado.

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada.

### Observações

seekg(n) não é necessariamente equivalente a seekg(n, ios::beg). [std::basic_ifstream](<#/doc/io/basic_ifstream>), por exemplo, exige que a posição absoluta `n` venha de [tellg()](<#/doc/io/basic_istream/tellg>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <string>
     
    int main()
    {
        std::string str = "Hello, world";
        std::istringstream in(str);
        std::string word1, word2;
     
        in >> word1;
        in.seekg(0); // rewind
        in >> word2;
     
        std::cout << "word1 = " << word1 << '\n'
                  << "word2 = " << word2 << '\n';
    }
```

Saída:
```
    word1 = Hello,
    word2 = Hello,
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 129](<https://cplusplus.github.io/LWG/issue129>) | C++98 | não havia como indicar uma falha | define `failbit` em caso de falha
[LWG 136](<https://cplusplus.github.io/LWG/issue136>) | C++98 | `seekg` poderia definir o stream de saída | apenas define o stream de entrada
[LWG 537](<https://cplusplus.github.io/LWG/issue537>) | C++98 | o tipo de `off` era `off_type&` | corrigido para `off_type`

### Ver também

[ tellg](<#/doc/io/basic_istream/tellg>) | retorna o indicador de posição de entrada
(função membro pública)
[ tellp](<#/doc/io/basic_ostream/tellp>) | retorna o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`)
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída
(função membro pública de `std::basic_ostream<CharT,Traits>`)
[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) | invoca seekpos()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_filebuf/seekpos>)[virtual] | reposiciona a posição do arquivo, usando endereçamento absoluto
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)
[ seekpos](<#/doc/io/basic_stringbuf/seekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos, usando endereçamento absoluto
(função membro protegida virtual de `std::basic_stringbuf<CharT,Traits,Allocator>`)
[ seekpos](<#/doc/io/strstreambuf/seekpos>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos, usando endereçamento absoluto
(função membro protegida virtual de `std::strstreambuf`)
[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) | invoca seekoff()
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] | reposiciona a posição do arquivo, usando endereçamento relativo
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)
[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos, usando endereçamento relativo
(função membro protegida virtual de `std::basic_stringbuf<CharT,Traits,Allocator>`)
[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambos, usando endereçamento relativo
(função membro protegida virtual de `std::strstreambuf`)