# std::basic_istream&lt;CharT,Traits&gt;::operator&gt;&gt;

```cpp
basic_istream& operator>>( unsigned short& value );  // (1)
basic_istream& operator>>( unsigned int& value );  // (2)
basic_istream& operator>>( long& value );  // (3)
basic_istream& operator>>( unsigned long& value );  // (4)
basic_istream& operator>>( long long& value );  // (5) (desde C++11)
basic_istream& operator>>( unsigned long long& value );  // (6) (desde C++11)
basic_istream& operator>>( float& value );  // (7)
basic_istream& operator>>( double& value );  // (8)
basic_istream& operator>>( long double& value );  // (9)
basic_istream& operator>>( bool& value );  // (10)
basic_istream& operator>>( void*& value );  // (11)
basic_istream& operator>>( short& value );  // (12)
basic_istream& operator>>( int& value );  // (13)
basic_istream& operator>>( /* extended-floating-point-type */& value );  // (14) (desde C++23)
basic_istream& operator>>( std::ios_base& (*func)(std::ios_base&) );  // (15)
basic_istream& operator>>( std::basic_ios<CharT, Traits>&
(*func)(std::basic_ios<CharT, Traits>&) );  // (16)
basic_istream& operator>>( basic_istream& (*func)(basic_istream&) );  // (17)
basic_istream& operator>>( std::basic_streambuf<CharT, Traits>* sb );  // (18)
```

  
Extrai valores de um fluxo de entrada.

1-11) Extrai um valor, potencialmente ignorando espaços em branco precedentes. O valor é armazenado em um valor de referência fornecido.

Esta função se comporta como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela (sentry object), que pode ignorar espaços em branco iniciais, extrai um valor chamando [`std::num_get::get()`](<#/doc/locale/num_get/get>).

12) Extrai um valor short, potencialmente ignorando espaços em branco precedentes. O valor é armazenado em um valor de referência fornecido.

Esta função se comporta como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela (sentry object), que pode ignorar espaços em branco iniciais, extrai um valor long lval chamando [`std::num_get::get()`](<#/doc/locale/num_get/get>). Depois disso: 

  * Se lval < [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;short&gt;::min(), define `failbit` e armazena [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;short&gt;::min() em val. 
  * Caso contrário, se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;short&gt;::max() < lval, define `failbit` e armazena [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;short&gt;::max() em val. 
  * Caso contrário, armazena static_cast&lt;short&gt;(lval) em val.

13) Extrai um valor int, potencialmente ignorando espaços em branco precedentes. O valor é armazenado em um valor de referência fornecido.

Esta função se comporta como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela (sentry object), que pode ignorar espaços em branco iniciais, extrai um valor long lval chamando [`std::num_get::get()`](<#/doc/locale/num_get/get>). Depois disso: 

  * Se lval < [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::min(), define `failbit` e armazena [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::min() em val. 
  * Caso contrário, se [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::max() < lval, define `failbit` e armazena [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::max() em val. 
  * Caso contrário, armazena static_cast&lt;int&gt;(lval) em val.

14) Extrai um valor de ponto flutuante estendido, potencialmente ignorando espaços em branco precedentes. O valor é armazenado em um valor de referência fornecido. A biblioteca fornece sobrecargas para todos os [tipos de ponto flutuante estendidos](<#/doc/language/types>) cv-unqualified como o tipo referenciado do parâmetro value.

Determina o tipo de ponto flutuante padrão `FP` da seguinte forma: 

  * Se o [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) de /* extended-floating-point-type */ for menor ou igual ao de float, então `FP` é float. 
  * Caso contrário, se o rank de conversão de ponto flutuante de /* extended-floating-point-type */ for menor ou igual ao de double, então `FP` é double. 
  * Caso contrário, `FP` é long double.

Esta função se comporta como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>). Após construir e verificar o objeto sentinela (sentry object), que pode ignorar espaços em branco iniciais, extrai um valor `FP` fval chamando [`std::num_get::get()`](<#/doc/locale/num_get/get>). Depois disso: 

  * Se fval < -[std::numeric_limits](<#/doc/types/numeric_limits>)</* extended-floating-point-type */>::max(), define `failbit` e armazena -[std::numeric_limits](<#/doc/types/numeric_limits>)</* extended-floating-point-type */>::max() em val. 
  * Caso contrário, se [std::numeric_limits](<#/doc/types/numeric_limits>)</* extended-floating-point-type */>::max() < fval, define `failbit` e armazena [std::numeric_limits](<#/doc/types/numeric_limits>)</* extended-floating-point-type */>::max() em val. 
  * Caso contrário, armazena static_cast</* extended-floating-point-type */>(fval) em val.

15-17) Chama func(*this), onde func é um manipulador de E/S.

18) Comporta-se como uma [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela (sentry object), extrai todos os dados de *this e os armazena em sb. A extração para se uma das seguintes condições for atendida: 

    

  * ocorre fim de arquivo na sequência de entrada; 
  * a inserção na sequência de saída falha (nesse caso, o caractere a ser inserido não é extraído); 
  * ocorre uma exceção (nesse caso, a exceção é capturada e somente relançada se nenhum caractere foi inserido e `failbit` está habilitado em `exceptions()`). 

Em ambos os casos, armazena o número de caracteres extraídos na variável membro acessada por chamadas subsequentes a [gcount()](<#/doc/io/basic_istream/gcount>). Se sb for um ponteiro nulo ou se nenhum caractere foi inserido em sb, chama setstate(failbit) (o que pode lançar [std::ios_base::failure](<#/doc/io/ios_base/failure>) se habilitado).

Se a extração falhar (por exemplo, se uma letra foi inserida onde um dígito é esperado), zero é escrito em value e `failbit` é definido. Para inteiros com sinal, se a extração resultar em um valor muito grande ou muito pequeno para caber em value, [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max() ou [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::min() (respectivamente) é escrito e o flag `failbit` é definido. Para inteiros sem sinal, se a extração resultar em um valor muito grande ou muito pequeno para caber em value, [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;T&gt;::max() é escrito e o flag `failbit` é definido. 

### Parâmetros

value  |  \-  |  referência para um valor inteiro ou de ponto flutuante para armazenar o valor extraído   
---|---|---
func  |  \-  |  ponteiro para função manipuladora de E/S   
sb  |  \-  |  ponteiro para o stream buffer para o qual todos os dados serão escritos   
  
### Valor de retorno

1-16,18) *this

17) func(*this)

### Observações

Para a sobrecarga ([14](<#/doc/io/basic_istream/operator_gtgt>)), quando o tipo de ponto flutuante estendido tem um rank de conversão de ponto flutuante que não é igual ao rank de qualquer tipo de ponto flutuante padrão, então o arredondamento duplo durante a conversão pode resultar em resultados imprecisos. [`std::from_chars()`](<#/doc/utility/from_chars>) pode ser usado em situações onde a precisão máxima é importante. 

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::string input = "41 3.14 false hello world";
        std::istringstream stream(input);
     
        int n;
        double f;
        bool b;
     
        stream >> n >> f >> std::boolalpha >> b;
        std::cout << "n = " << n << '\n'
                  << "f = " << f << '\n'
                  << "b = " << std::boolalpha << b << '\n';
     
        // extract the rest using the streambuf overload
        stream >> std::cout.rdbuf();
        std::cout << '\n';
    }
```

Output: 
```
    n = 41
    f = 3.14
    b = false
    hello world
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 64](<https://cplusplus.github.io/LWG/issue64>) | C++98  | não estava claro se a sobrecarga (18) pode apenas relançar a  
[std::ios_base::failure](<#/doc/io/ios_base/failure>) lançada ao chamar setstate(failbit) | todas as exceções capturadas  
podem ser relançadas   
[LWG 118](<https://cplusplus.github.io/LWG/issue118>) | C++98  | a sobrecarga (12,13) delegava a extração para [`num_get::get`](<#/doc/locale/num_get/get>),  
mas esta não possui sobrecargas para short e int | um valor long é extraído  
em vez de short ou int  
[LWG 413](<https://cplusplus.github.io/LWG/issue413>) | C++98  | a sobrecarga (18) apenas relançava exceções lançadas ao extrair
---|---|---
caracteres de sb, mas os caracteres são extraídos de *this | sb corrigido para *this  
[LWG 567](<https://cplusplus.github.io/LWG/issue567>) | C++98  | a sobrecarga (18) se comportava como uma [FormattedInputFunction](<#/doc/named_req/FormattedInputFunction>)  
devido à resolução do [LWG issue 60](<https://cplusplus.github.io/LWG/issue60>) | ela se comporta como uma  
[UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>)  
[LWG 661](<https://cplusplus.github.io/LWG/issue661>) | C++98  | as sobrecargas (12,13) não armazenavam o número extraído  
em value devido à resolução do [LWG issue 118](<https://cplusplus.github.io/LWG/issue118>) | armazena o número se  
nenhum overflow ocorrer   
[LWG 696](<https://cplusplus.github.io/LWG/issue696>) | C++98  | value permanecia inalterado em caso de falha na extração | definido para zero ou valores mínimo/  
máximo   
  
### Veja também

[ operator>>(std::basic_istream)](<#/doc/io/basic_istream/operator_gtgt2>) |  extrai caracteres e arrays de caracteres   
(modelo de função)  
[ operator<&lt;operator&gt;>](<#/doc/string/basic_string/operator_ltltgtgt>) |  realiza entrada e saída de stream em strings   
(modelo de função)  
[ operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt2>) |  realiza entrada e saída de stream de bitsets   
(modelo de função)  
[ operator<&lt;operator&gt;>](<#/doc/numeric/complex/operator_ltltgtgt>) |  serializa e desserializa um número complexo   
(modelo de função)  
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/linear_congruential_engine/operator_ltltgtgt>)(C++11) |  realiza entrada e saída de stream em motor de números pseudoaleatórios   
(modelo de função)  
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/uniform_int_distribution/operator_ltltgtgt>)(C++11) |  realiza entrada e saída de stream em distribuição de números pseudoaleatórios   
(modelo de função)  
[ read](<#/doc/io/basic_istream/read>) |  extrai blocos de caracteres   
(função membro pública)  
[ readsome](<#/doc/io/basic_istream/readsome>) |  extrai blocos de caracteres já disponíveis   
(função membro pública)  
[ get](<#/doc/io/basic_istream/get>) |  extrai caracteres   
(função membro pública)  
[ getline](<#/doc/io/basic_istream/getline>) |  extrai caracteres até que o caractere fornecido seja encontrado   
(função membro pública)  
[ from_chars](<#/doc/utility/from_chars>)(C++17) |  converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante   
(função)