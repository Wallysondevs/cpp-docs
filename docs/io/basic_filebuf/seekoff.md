# std::basic_filebuf&lt;CharT,Traits&gt;::seekoff

protected:  
virtual pos_type seekoff( off_type off,  
[std::ios_base::seekdir](<#/doc/io/ios_base/seekdir>) dir,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which = [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) );

  
Reposiciona o ponteiro de arquivo, se possível, para a posição que corresponde a exatamente `off` caracteres a partir do início, fim ou posição atual do arquivo (dependendo do valor de `dir`).

Se o arquivo associado não estiver aberto (`is_open() == false`), falha imediatamente.

Se a codificação de caracteres multibyte for dependente de estado ([`codecvt::encoding()`](<#/doc/locale/codecvt/encoding>) retornou -1) ou de comprimento variável (`codecvt::encoding()` retornou ​0​) e o `offset off` não for ​0​, falha imediatamente: esta função não pode determinar o número de bytes que correspondem a `off` caracteres.

Se `dir` não for [std::basic_ios::cur](<#/doc/io/ios_base/seekdir>) ou o `offset off` não for ​0​, e a operação mais recente realizada neste objeto `filebuf` foi de saída (ou seja, o buffer de `put` não está vazio, ou a função mais recentemente chamada foi [overflow()](<#/doc/io/basic_streambuf/overflow>)), então chama `std::codecvt::unshift` para determinar a sequência de `unshift` necessária, e escreve essa sequência no arquivo chamando [overflow()](<#/doc/io/basic_streambuf/overflow>).

Em seguida, converte o argumento `dir` para um valor `whence` do tipo `int` da seguinte forma:

valor de dir |  valor de whence  
---|---
std::basic_ios::beg |  [SEEK_SET](<#/doc/io/c>)  
std::basic_ios::end |  [SEEK_END](<#/doc/io/c>)  
std::basic_ios::cur |  [SEEK_CUR](<#/doc/io/c>)  
  
Então, se a codificação de caracteres for de largura fixa (`codecvt::encoding()` retorna um número positivo `width`), move o ponteiro de arquivo como se por [std::fseek](<#/doc/io/c/fseek>)(file, width*off, whence).

Caso contrário, move o ponteiro de arquivo como se por [std::fseek](<#/doc/io/c/fseek>)(file, 0, whence).

O argumento `openmode`, exigido pela assinatura da função da classe base, é geralmente ignorado, porque `std::basic_filebuf` mantém apenas uma posição de arquivo.

### Parâmetros

off  |  \-  |  posição relativa para definir o indicador de posição   
---|---
dir  |  \-  |  define a posição base para aplicar o offset relativo. Pode ser uma das seguintes constantes:  |  Constante  |  Explicação   
[`beg`](<#/doc/io/ios_base/seekdir>) |  o início de um stream   
[`end`](<#/doc/io/ios_base/seekdir>) |  o fim de um stream   
[`cur`](<#/doc/io/ios_base/seekdir>) |  a posição atual do indicador de posição do stream   
which  |  \-  |  define qual das sequências de entrada e/ou saída afetar. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação   
[`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada   
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Valor de retorno

Um objeto recém-construído do tipo `pos_type` que armazena a posição de arquivo resultante, ou `pos_type(off_type(-1))` em caso de falha.

### Observações

`seekoff()` é chamado por `std::basic_streambuf::pubseekoff`, que é chamado por `std::basic_istream::seekg`, `std::basic_ostream::seekp`, `std::basic_istream::tellg`, e `std::basic_ostream::tellp`.

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <locale>
    
    template<typename CharT>
    int get_encoding(const std::basic_istream<CharT>& stream)
    {
        using Facet = std::codecvt<CharT, char, std::mbstate_t>;
        return std::use_facet<Facet>(stream.getloc()).encoding();
    }
    
    int main()
    {
        // prepare a 10-byte file holding 4 characters ("zß水𝄋") in UTF-8
        std::ofstream("text.txt") << "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b";
    
        // open using a non-converting encoding
        std::ifstream f1("text.txt");
        std::cout << "f1's locale's encoding() returns "
                  << get_encoding(f1) << '\n'
                  << "pubseekoff(3, beg) returns "
                  << f1.rdbuf()->pubseekoff(3, std::ios_base::beg) << '\n'
                  << "pubseekoff(0, end) returns "
                  << f1.rdbuf()->pubseekoff(0, std::ios_base::end) << '\n';
    
        // open using UTF-8
        std::wifstream f2("text.txt");
        f2.imbue(std::locale("en_US.UTF-8"));
        std::cout << "f2's locale's encoding() returns "
                  << get_encoding(f2) << '\n'
                  << "pubseekoff(3, beg) returns "
                  << f2.rdbuf()->pubseekoff(3, std::ios_base::beg) << '\n'
                  << "pubseekoff(0, end) returns "
                  << f2.rdbuf()->pubseekoff(0, std::ios_base::end) << '\n';
    }
```

Saída: 
```
    f1's locale's encoding() returns 1
    pubseekoff(3, beg) returns 3
    pubseekoff(0, end) returns 10
    f2's locale's encoding() returns 0
    pubseekoff(3, beg) returns -1
    pubseekoff(0, end) returns 10
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98  | `seekoff` retornava uma posição de stream inválida indefinida em caso de falha  | `pos_type(off_type(-1))` é retornado em caso de falha   
  
### Ver também

[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) |  invoca seekoff()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ seekpos](<#/doc/io/basic_filebuf/seekpos>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento absoluto   
(função membro virtual protegida)  
[ fseek](<#/doc/io/c/fseek>) |  move o indicador de posição do arquivo para um local específico em um arquivo   
(função)