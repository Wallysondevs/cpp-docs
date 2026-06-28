# std::basic_ostream&lt;CharT,Traits&gt;::write

basic_ostream& write( const char_type* s, [std::streamsize](<#/doc/io/streamsize>) count );

  
Comporta-se como uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>). Após construir e verificar o objeto sentinela, escreve os caracteres de locais sucessivos no array de caracteres cujo primeiro elemento é apontado por s. Caracteres são inseridos na sequência de saída até que uma das seguintes condições ocorra: 

  * exatamente `count` caracteres são inseridos 
  * a inserção na sequência de saída falha (nesse caso, `setstate(badbit)` é chamado). 

### Parâmetros

s  |  \-  |  ponteiro para a string de caracteres a ser escrita   
---|---|---
count  |  \-  |  número de caracteres a serem escritos   
  
### Valor de retorno

`*this`

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (a flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceções para esse estado. 

Se uma operação interna lança uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para `badbit`, a exceção é relançada. 

### Observações

Esta função não é sobrecarregada para os tipos `signed char` ou `unsigned char`, diferentemente do [operator<<](<#/doc/io/basic_ostream/operator_ltlt2>) formatado. 

Além disso, diferentemente das funções de saída formatadas, esta função não define o [failbit](<#/doc/io/ios_base/iostate>) em caso de falha. 

Ao usar um locale não-conversor (o locale padrão é não-conversor), o sobrescritor desta função em [std::basic_ofstream](<#/doc/io/basic_ofstream>) pode ser otimizado para I/O em massa sem cópia (zero-copy bulk I/O) (por meio da sobrescrita de [std::streambuf::xsputn](<#/doc/io/basic_streambuf/sputn>)). 

### Exemplo

Esta função pode ser usada para exibir representações de objetos, ou seja, saída binária

Execute este código
```cpp 
    #include <iostream>
     
    int main()
    {
        int n = 0x41424344;
        std::cout.write(reinterpret_cast<char*>(&n), sizeof n) << '\n';
     
        char c[] = "This is sample text.";
        std::cout.write(c, 4).write("!\n", 2);
    }
```

Saída possível: 
```
    DCBA
    This!
```

### Ver também

[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) |  insere dados de caracteres ou insere em um rvalue stream   
(modelo de função)  
[ put](<#/doc/io/basic_ostream/put>) |  insere um caractere   
(função membro pública)