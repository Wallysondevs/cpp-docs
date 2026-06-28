# std::basic_ostream&lt;CharT,Traits&gt;::sentry

class sentry;

  
Um objeto da classe `basic_ostream::sentry` é construído no escopo local no início de cada função membro de [std::basic_ostream](<#/doc/io/basic_ostream>) que realiza saída (tanto formatada quanto não formatada). Seu construtor prepara o stream de saída: verifica se o stream já está em um estado de falha, descarrega os streams de saída associados (tie()'d), e executa outras tarefas definidas pela implementação, se necessário. A limpeza definida pela implementação, bem como o descarregamento do stream de saída, se necessário, é realizada no destrutor, de modo que é garantido que aconteça se exceções forem lançadas durante a saída.

### Funções membro

**(construtor)** |  constrói o objeto sentry. Todas as tarefas de preparação são feitas aqui   
(função membro pública)  
**(destrutor)** |  finaliza o objeto stream após saída formatada ou após exceção, se necessário   
(função membro pública)  
operator= |  o operador de atribuição é deletado   
(função membro pública)  
** operator bool** |  verifica se a preparação do objeto stream foi bem-sucedida   
(função membro pública)  
  
##  std::basic_ostream::sentry::sentry

explicit sentry( [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>& os );

  
Prepara o stream para saída formatada.

Se os.good() for false, retorna. Caso contrário, se os.tie() não for um ponteiro nulo, chama os.tie()->flush() para sincronizar a sequência de saída com streams externos. Durante a preparação, o construtor pode chamar setstate(failbit) (o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>)).

Se após a preparação ser concluída, os.good() == true, então quaisquer chamadas subsequentes a operator bool retornarão true.

###  Parâmetros

os  |  \-  |  stream de saída a ser preparado   
  
###  Exceções

[std::ios_base::failure](<#/doc/io/ios_base/failure>) se a condição de fim de arquivo ocorrer.

  

##  std::basic_ostream::sentry::~sentry

~sentry();

  
Se (os.flags() & [std::ios_base::unitbuf](<#/doc/io/ios_base/fmtflags>)) && ![std::uncaught_exception](<#/doc/error/exception/uncaught_exception>)() && os.good()) for true, chama os.rdbuf()->pubsync(). Se essa função retornar -1, define badbit em os.rdstate() sem propagar uma exceção.

  

##  std::basic_ostream::sentry::operator bool

explicit operator bool() const;

  
Verifica se a preparação do stream de saída foi bem-sucedida.

###  Parâmetros

(nenhum)

###  Valor de retorno

true se a preparação do stream de saída foi bem-sucedida, false caso contrário.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    struct Foo
    {
        char n[6];
    };
     
    std::ostream& operator<<(std::ostream& os, Foo& f)
    {
        std::ostream::sentry s(os);
        if (s)
            os.write(f.n, 5);
        return os;
    }
     
    int main()
    {
        Foo f = {"abcde"};
        std::cout << f << '\n';
    }
```

Saída: 
```
    abcde
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 397](<https://cplusplus.github.io/LWG/issue397>) | C++98  | o destrutor pode chamar os.flush(), o que pode lançar exceções  | a exceção não é propagada   
[LWG 442](<https://cplusplus.github.io/LWG/issue442>) | C++98  | operator bool não foi declarado const (é const na [sinopse](<#/doc/header/ostream>))  | adicionado const  
[LWG 835](<https://cplusplus.github.io/LWG/issue835>) | C++98  | se os definir `unitbuf`, o destrutor chamaria os.flush(), que é uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>) e cria outro objeto sentry (cujo destrutor então cria outro objeto sentry e assim por diante)  | chama os.rdbuf()->pubsync() neste caso   
  
### Ver também

[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) |  insere dados formatados   
(função membro pública)  