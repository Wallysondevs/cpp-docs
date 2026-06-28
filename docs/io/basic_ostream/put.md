# std::basic_ostream&lt;CharT,Traits&gt;::put

basic_ostream& put( char_type ch );

  
Comporta-se como uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>). Após construir e verificar o sentry object, escreve o caractere `ch` no stream de saída.

Se a saída falhar por qualquer motivo, define `badbit`.

### Parâmetros

ch  |  \-  |  caractere a ser escrito   
  
### Valor de retorno

*this

### Observações

Esta função não é sobrecarregada para os tipos signed char ou unsigned char, ao contrário do formatado [operator<<](<#/doc/io/basic_ostream/operator_ltlt2>).

Ao contrário das funções de saída formatada, esta função não define `failbit` se a saída falhar.

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
     
    int main()
    {
        std::cout.put('a'); // normal usage
        std::cout.put('\n');
     
        std::ofstream s("/does/not/exist/");
        s.clear(); // pretend the stream is good
        std::cout << "Unformatted output: ";
        s.put('c'); // this will set badbit, but not failbit
        std::cout << " fail=" << bool(s.rdstate() & s.failbit);
        std::cout << " bad=" << s.bad() << '\n';
        s.clear();
        std::cout << "Formatted output:   ";
        s << 'c'; // this will set badbit and failbit
        std::cout << " fail=" << bool(s.rdstate() & s.failbit);
        std::cout << " bad=" << s.bad() << '\n';
    }
```

Saída:
```
    a
    Unformatted output:  fail=0 bad=1
    Formatted output:    fail=1 bad=1
```

### Veja também

[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) | insere dados de caractere ou insere em um rvalue stream   
(modelo de função)  
[ write](<#/doc/io/basic_ostream/write>) | insere blocos de caracteres   
(função membro pública)