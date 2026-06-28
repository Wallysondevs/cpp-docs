# std::basic_istream&lt;CharT,Traits&gt;::ignore

basic_istream& ignore( [std::streamsize](<#/doc/io/streamsize>) count = 1, int_type delim = Traits::eof() );

  
Extrai e descarta caracteres do fluxo de entrada até e incluindo delim. 

`ignore` se comporta como uma [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela, ele extrai caracteres do fluxo e os descarta até que qualquer uma das seguintes condições ocorra: 

  * count caracteres foram extraídos. Este teste é desabilitado no caso especial em que count é igual a [std::numeric_limits](<#/doc/types/numeric_limits>)<[std::streamsize](<#/doc/io/streamsize>)>::max(). 

  * condições de fim de arquivo ocorrem na sequência de entrada, caso em que a função chama setstate(eofbit). 

  * o próximo caractere disponível c na sequência de entrada é delim, conforme determinado por Traits::eq_int_type(Traits::to_int_type(c), delim). O caractere delimitador é extraído e descartado. Este teste é desabilitado se delim for Traits::eof(). 

### Parâmetros

count  |  \-  |  número de caracteres a extrair   
---|---|---
delim  |  \-  |  caractere delimitador para parar a extração. Ele também é extraído   
  
### Valor de retorno

*this

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar para esse estado. 

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada. 

### Exemplo

O exemplo a seguir usa `ignore` para pular entrada não numérica:

Execute este código
```
    #include <iostream>
    #include <limits>
    #include <sstream>
     
    constexpr auto max_size = std::numeric_limits<std::streamsize>::max();
     
    int main()
    {
        std::istringstream input("1\n"
                                 "some non-numeric input\n"
                                 "2\n");
        for (;;)
        {
            int n;
            input >> n;
     
            if (input.eof() || input.bad())
                break;
            else if (input.fail())
            {
                input.clear(); // unset failbit
                input.ignore(max_size, '\n'); // skip bad input
            }
            else
                std::cout << n << '\n';
        }
    }
```

Saída: 
```
    1
    2
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 172](<https://cplusplus.github.io/LWG/issue172>) | C++98  | o tipo de count foi especificado incorretamente como int | corrigido para [std::streamsize](<#/doc/io/streamsize>)  
  
### Veja também

[ get](<#/doc/io/basic_istream/get>) |  extrai caracteres   
(função membro pública)  
[ getline](<#/doc/io/basic_istream/getline>) |  extrai caracteres até que o caractere fornecido seja encontrado   
(função membro pública)