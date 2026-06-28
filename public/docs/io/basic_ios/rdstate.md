# std::basic_ios&lt;CharT,Traits&gt;::rdstate

iostate rdstate() const;

  
Retorna o estado de erro atual do stream. 

### Parâmetros

(nenhum) 

### Valor de retorno

Estado de erro atual do stream. É um tipo bitmask e pode ser uma combinação das seguintes constantes: 

Constante  |  Explicação   
---|---
[`goodbit`](<#/doc/io/ios_base/iostate>) |  nenhum erro   
[`badbit`](<#/doc/io/ios_base/iostate>) |  erro de stream irrecuperável   
[`failbit`](<#/doc/io/ios_base/iostate>) |  operação de entrada/saída falhou (erro de formatação ou extração)   
[`eofbit`](<#/doc/io/ios_base/iostate>) |  sequência de entrada associada atingiu o fim do arquivo   
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::ostringstream stream;
     
        if (stream.rdstate() == std::ios_base::goodbit)
            std::cout << "stream state is goodbit\n";
     
        stream.setstate(std::ios_base::eofbit);
     
        // check state is exactly eofbit (no failbit and no badbit)
        if (stream.rdstate() == std::ios_base::eofbit)
            std::cout << "stream state is eofbit\n";
    }
```

Saída: 
```
    stream state is goodbit
    stream state is eofbit
```

### Veja também

[ setstate](<#/doc/io/basic_ios/setstate>) |  define flags de estado   
(função membro pública)  
[ clear](<#/doc/io/basic_ios/clear>) |  modifica flags de estado   
(função membro pública)