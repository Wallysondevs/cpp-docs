# std::basic_ostream&lt;CharT,Traits&gt;::seekp

```cpp
basic_ostream& seekp( pos_type pos );  // (1)
basic_ostream& seekp( off_type off, std::ios_base::seekdir dir );  // (2)
```

  
Define o indicador de posição de saída do objeto `streambuf` associado atual.

Comporta-se como [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>) (exceto por não realizar saída de fato). Após construir e verificar o objeto sentinela, | (desde C++11)
  
1) se fail() != true, define o indicador de posição de saída para o valor absoluto pos (relativo ao início do arquivo) chamando rdbuf()->pubseekpos(pos, [std::ios_base::out](<#/doc/io/ios_base/openmode>)). Em caso de falha, chama setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>)).

2) se fail() != true, define o indicador de posição de saída para o deslocamento off relativo a dir chamando rdbuf()->pubseekoff(off, dir, [std::ios_base::out](<#/doc/io/ios_base/openmode>)). Em caso de falha, chama setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>)).

### Parameters

pos  |  \-  |  posição absoluta para definir o indicador de posição de saída off  |  \-  |  posição relativa (positiva ou negativa) para definir o indicador de posição de saída dir  |  \-  |  define a posição base para aplicar o deslocamento relativo. Pode ser uma das seguintes constantes:  |  Constante  |  Explicação [`beg`](<#/doc/io/ios_base/seekdir>) |  o início de um stream
---|---
[`end`](<#/doc/io/ios_base/seekdir>) |  o fim de um stream   
[`cur`](<#/doc/io/ios_base/seekdir>) |  a posição atual do indicador de posição do stream   
  
### Return value

*this

### Exceptions

1,2) Pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) em caso de falha, se exceptions() & failbit != 0.

### Example

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::ostringstream os("hello, world");
        os.seekp(7);
        os << 'W';
        os.seekp(0, std::ios_base::end);
        os << '!';
        os.seekp(0);
        os << 'H';
        std::cout << os.str() << '\n';
    }
```

Saída:
```
    Hello, World!
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 129](<https://cplusplus.github.io/LWG/issue129>) | C++98  | não havia como indicar uma falha  | define `failbit` em caso de falha   
[LWG 136](<https://cplusplus.github.io/LWG/issue136>) | C++98  | `seekp` poderia definir o stream de entrada  | apenas define o stream de saída   
[LWG 537](<https://cplusplus.github.io/LWG/issue537>) | C++98  | 1. o tipo de pos era `pos_type&`  
2. o tipo de off era `off_type&` | 1. corrigido para `pos_type`  
2. corrigido para `off_type`  
[LWG 2341](<https://cplusplus.github.io/LWG/issue2341>) | C++98  | a resolução do [LWG issue 129](<https://cplusplus.github.io/LWG/issue129>) para a sobrecarga (2) foi removida  | restaurado   
  
### See also

[ tellp](<#/doc/io/basic_ostream/tellp>) |  retorna o indicador de posição de saída   
(função membro pública)  
[ tellg](<#/doc/io/basic_istream/tellg>) |  retorna o indicador de posição de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ seekg](<#/doc/io/basic_istream/seekg>) |  define o indicador de posição de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)