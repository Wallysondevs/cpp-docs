# std::basic_istream&lt;CharT,Traits&gt;::sentry

class sentry;

  
Um objeto da classe `basic_istream::sentry` é construído no escopo local no início de cada função membro de [std::basic_istream](<#/doc/io/basic_istream>) que realiza entrada (tanto formatada quanto não formatada). Seu construtor prepara o stream de entrada: verifica se o stream já está em um estado de falha, descarrega os streams de saída `tie()`'d, ignora espaços em branco iniciais a menos que a flag `noskipws` esteja definida, e executa outras tarefas definidas pela implementação, se necessário. Toda a limpeza, se necessário, é realizada no destrutor, de modo que é garantido que ocorra se exceções forem lançadas durante a entrada. 

### Tipos Membro

`traits_type` |  `Traits`  
  
### Funções Membro

**(construtor)** |  constrói o objeto sentry. Todas as tarefas de preparação são feitas aqui   
(função membro pública)  
**(destrutor)** |  finaliza o objeto stream após entrada formatada ou após exceção, se necessário   
(função membro pública)  
operator=[deleted] |  não copiável por atribuição   
(função membro pública)  
** operator bool** |  verifica se a preparação do objeto stream foi bem-sucedida   
(função membro pública)  
  
##  std::basic_istream::sentry::sentry

explicit sentry( [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>& is, bool noskipws = false );

  
Prepara o stream para entrada formatada. 

Se `is.good()` for `false`, chama `is.setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>))` e retorna. Caso contrário, se `is.tie()` não for um ponteiro nulo, chama `is.tie()->flush()` para sincronizar a sequência de saída com streams externos. Esta chamada pode ser suprimida se a área de `put` de `is.tie()` estiver vazia. A implementação pode adiar a chamada para `flush()` até que ocorra uma chamada de `is.rdbuf()->underflow()`. Se nenhuma dessas chamadas ocorrer antes que o objeto `sentry` seja destruído, ela pode ser eliminada inteiramente. 

Se `noskipws` for zero e `is.flags() & [std::ios_base::skipws](<#/doc/io/ios_base/fmtflags>)` for diferente de zero, a função extrai e descarta todos os caracteres de espaço em branco até que o próximo caractere disponível não seja um caractere de espaço em branco (conforme determinado pela locale atualmente imbuída em `is`). Se `is.rdbuf()->sbumpc()` ou `is.rdbuf()->sgetc()` retornar `traits::eof()`, a função chama `setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>) | [std::ios_base::eofbit](<#/doc/io/ios_base/iostate>))` (o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>)). 

Preparações adicionais definidas pela implementação podem ocorrer, as quais podem chamar `setstate([std::ios_base::failbit](<#/doc/io/ios_base/iostate>))` (o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>)). 

Se após a conclusão da preparação, `is.good() == true`, então quaisquer chamadas subsequentes a `operator bool` retornarão `true`. 

### Parâmetros

is  |  \-  |  stream de entrada a ser preparado   
---|---|---
noskipws  |  \-  |  `true` se espaços em branco não devem ser ignorados   
  
### Exceções

[std::ios_base::failure](<#/doc/io/ios_base/failure>) se a condição de fim de arquivo ocorrer ao ignorar espaços em branco. 

##  std::basic_istream::sentry::~sentry

~sentry();

  
Não faz nada. 

##  std::basic_istream::sentry::operator bool

explicit operator bool() const;

  
Verifica se a preparação do stream de entrada foi bem-sucedida. 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se a inicialização do stream de entrada foi bem-sucedida, `false` caso contrário. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    struct Foo
    {
        char n[5];
    };
     
    std::istream& operator>>(std::istream& is, Foo& f)
    {
        std::istream::sentry s(is);
        if (s)
            is.read(f.n, 5);
        return is;
    }
     
    int main()
    {
        std::string input = "   abcde";
        std::istringstream stream(input);
        Foo f;
        stream >> f;
        std::cout.write(f.n, 5);
        std::cout << '\n';
    }
```

Saída: 
```
    abcde
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 195](<https://cplusplus.github.io/LWG/issue195>) | C++98  | não estava claro se o construtor definiria `eofbit` | esclarecido   
[LWG 419](<https://cplusplus.github.io/LWG/issue419>) | C++98  | o construtor não definia `failbit` se `eofbit` tivesse sido definido | define `failbit` neste caso   
  
### Veja também

[ operator>>](<#/doc/io/basic_istream/operator_gtgt>) |  extrai dados formatados   
(função membro pública)  
[ operator>>(std::basic_istream)](<#/doc/io/basic_istream/operator_gtgt2>) |  extrai caracteres e arrays de caracteres   
(template de função)