# std::basic_istream&lt;CharT,Traits&gt;::gcount

[std::streamsize](<#/doc/io/streamsize>) gcount() const;

Retorna o número de caracteres extraídos pela última [operação de entrada não formatada](<#/doc/named_req/UnformattedInputFunction>), ou o valor máximo representável de [std::streamsize](<#/doc/io/streamsize>) se o número não for representável.

As seguintes funções membro de `basic_istream` alteram o valor das chamadas subsequentes a `gcount()`:

  * [move constructor](<#/doc/io/basic_istream/basic_istream>)
  * [swap()](<#/doc/io/basic_ios/swap>)
  * [get()](<#/doc/io/basic_istream/get>)
  * [getline()](<#/doc/io/basic_istream/getline>)
  * [ignore()](<#/doc/io/basic_istream/ignore>)
  * [read()](<#/doc/io/basic_istream/read>)
  * [readsome()](<#/doc/io/basic_istream/readsome>)
  * [operator>>(basic_streambuf*)](<#/doc/io/basic_istream/operator_gtgt>)

As seguintes funções definem `gcount()` como zero:

  * [constructor](<#/doc/io/basic_istream/basic_istream>)
  * [putback()](<#/doc/io/basic_istream/putback>)
  * [unget()](<#/doc/io/basic_istream/unget>)
  * [peek()](<#/doc/io/basic_istream/peek>)

### Parâmetros

(nenhum)

### Valor de retorno

O número de caracteres extraídos pela última operação de entrada não formatada, ou o valor máximo representável de [std::streamsize](<#/doc/io/streamsize>) se o número não for representável.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        char x[20];
        std::istringstream stream("Hello World");
    
        stream.read(x, sizeof x);
        std::cout << "Characters extracted: " << stream.gcount();
    }
```

Saída:
```
    Characters extracted: 11
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3464](<https://cplusplus.github.io/LWG/issue3464>) | C++98 | o valor de retorno era não especificado quando o resultado estourava | retorna o valor máximo