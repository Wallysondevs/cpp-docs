# std::basic_ios&lt;CharT,Traits&gt;::setstate

void setstate( iostate state );

  
Define o estado dos sinalizadores de erro do stream em adição aos sinalizadores atualmente definidos. Essencialmente chama clear(rdstate() | state). Pode lançar uma exceção.

### Parameters

state  |  \-  |  sinalizadores de estado de erro do stream a serem definidos. Pode ser uma combinação das seguintes constantes:  |  Constante  |  Explicação   
---|---
[`goodbit`](<#/doc/io/ios_base/iostate>) |  nenhum erro   
[`badbit`](<#/doc/io/ios_base/iostate>) |  erro de stream irrecuperável   
[`failbit`](<#/doc/io/ios_base/iostate>) |  operação de entrada/saída falhou (erro de formatação ou extração)   
[`eofbit`](<#/doc/io/ios_base/iostate>) |  sequência de entrada associada atingiu o fim do arquivo   
  
### Return value

(nenhum) 

### Example

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::ostringstream stream;
     
        if (!stream.fail())
            std::cout << "stream is not fail\n";
     
        stream.setstate(std::ios_base::failbit);
     
        if (stream.fail())
            std::cout << "now stream is fail\n";
     
        if (!stream.good())
            std::cout << "and stream is not good\n";
    }
```

Saída: 
```
    stream is not fail
    now stream is fail
    and stream is not good
```

### See also

[ rdstate](<#/doc/io/basic_ios/rdstate>) |  retorna sinalizadores de estado   
(função membro pública)  
[ clear](<#/doc/io/basic_ios/clear>) |  modifica sinalizadores de estado   
(função membro pública)