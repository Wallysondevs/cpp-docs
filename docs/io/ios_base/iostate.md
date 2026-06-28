# std::ios_base::iostate

typedef /*implementation defined*/ iostate;
static constexpr iostate goodbit = 0;
static constexpr iostate badbit = /* implementation defined */  
static constexpr iostate failbit = /* implementation defined */  
static constexpr iostate eofbit = /* implementation defined */

  
Especifica flags de estado de stream. É um [BitmaskType](<#/doc/named_req/BitmaskType>), as seguintes constantes são definidas: 

Constante  |  Explicação   
---|---
`goodbit` |  nenhum erro   
`badbit` |  erro de stream irrecuperável   
`failbit` |  operação de entrada/saída falhou (erro de formatação ou extração)   
`eofbit` |  sequência de entrada associada atingiu o fim do arquivo   
  
#### O eofbit

O eofbit é definido pelas seguintes funções da standard library: 

  * A função de entrada de string [std::getline](<#/doc/string/basic_string/getline>) se ela for concluída ao atingir o fim do stream, em vez de atingir o caractere terminador especificado. 
  * As sobrecargas de entrada numérica de [`basic_istream::operator>>`](<#/doc/io/basic_istream/operator_gtgt>) se o fim do stream for encontrado durante a leitura do próximo caractere, no Estágio 2 do processamento de [`num_get::get`](<#/doc/locale/num_get/get>). Dependendo do estado da análise, `failbit` pode ou não ser definido ao mesmo tempo: por exemplo, int n; istringstream buf("1"); buf >> n; define `eofbit`, mas não `failbit`: o inteiro 1 foi analisado com sucesso e armazenado em `n`. Por outro lado, bool b; istringstream buf("tr"); buf >> boolalpha >> b; define ambos `eofbit` e `failbit`: não havia caracteres suficientes para completar a análise do booleano true. 
  * As sobrecargas de extração de caractere de [`operator>>std::basic_istream`](<#/doc/io/basic_istream/operator_gtgt2>), se o fim do stream for atingido antes do limite (se houver) no número de caracteres a serem extraídos. 
  * O manipulador de E/S [std::get_time](<#/doc/io/manip/get_time>) e qualquer uma das funções de análise de [std::time_get](<#/doc/locale/time_get>): [`time_get::get`](<#/doc/locale/time_get/get>), [`time_get::get_time`](<#/doc/locale/time_get/get_time>), [`time_get::get_date`](<#/doc/locale/time_get/get_date>), etc., se o fim do stream for atingido antes que o último caractere necessário para analisar o valor de data/hora esperado seja processado. 
  * O manipulador de E/S [std::get_money](<#/doc/io/manip/get_money>) e a função [`money_get::get`](<#/doc/locale/money_get/get>), se o fim do stream for atingido antes que o último caractere necessário para analisar o valor monetário esperado seja processado. 
  * O construtor [`basic_istream::sentry`](<#/doc/io/basic_istream/sentry>), executado no início de cada função de entrada formatada: a menos que o bit `skipws` esteja desativado (por exemplo, emitindo [std::noskipws](<#/doc/io/manip/skipws>)), sentry lê e descarta os caracteres de espaço em branco iniciais. Se o fim do stream de entrada for atingido durante esta operação, ambos `eofbit` e `failbit` são definidos, e nenhuma entrada ocorre. 
  * O manipulador de E/S [std::ws](<#/doc/io/manip/ws>), se ele atingir o fim do stream enquanto consome espaço em branco (mas, ao contrário do sentry de entrada formatada, ele não define `failbit` neste caso). 
  * As funções de entrada não formatada [`basic_istream::read`](<#/doc/io/basic_istream/read>), [`basic_istream::get`](<#/doc/io/basic_istream/get>), [`basic_istream::peek`](<#/doc/io/basic_istream/peek>), [`basic_istream::readsome`](<#/doc/io/basic_istream/readsome>), [`basic_istream::ignore`](<#/doc/io/basic_istream/ignore>), e [`basic_istream::getline`](<#/doc/io/basic_istream/getline>), ao atingir o fim do stream. 
  * A função de descarte de entrada [`basic_istream::ignore`](<#/doc/io/basic_istream/ignore>), ao atingir o fim do stream antes de atingir o caractere delimitador especificado. 
  * A função de entrada imediata [`basic_istream::readsome`](<#/doc/io/basic_istream/readsome>), se [`basic_streambuf::in_avail`](<#/doc/io/basic_streambuf/in_avail>) retornar -1. 

As seguintes funções limpam `eofbit` como um efeito colateral: 

  * [`basic_istream::putback`](<#/doc/io/basic_istream/putback>)
  * [`basic_istream::unget`](<#/doc/io/basic_istream/unget>)
  * [`basic_istream::seekg`](<#/doc/io/basic_istream/seekg>)

Note que em quase todas as situações, se `eofbit` for definido, o `failbit` também é definido. 

#### O failbit

O failbit é definido pelas seguintes funções da standard library: 

  * O construtor [`basic_istream::sentry`](<#/doc/io/basic_istream/sentry>), executado no início de cada função de entrada, se `eofbit` ou `badbit` já estiver definido no stream, ou se o fim do stream for encontrado enquanto consome espaços em branco iniciais. 
  * O construtor [`basic_ostream::sentry`](<#/doc/io/basic_ostream/sentry>), executado no início de cada função de saída, sob condições definidas pela implementação. 
  * [`operator>>(std::basic_string<>)`](<#/doc/string/basic_string/operator_ltltgtgt>) se a função não extrair nenhum caractere do stream de entrada. 
  * [`operator>>(std::complex<>)`](<#/doc/numeric/complex/operator_ltltgtgt>) se a função falhar ao extrair um número complexo válido. 
  * As sobrecargas de array de caracteres e de caractere único de [`operator>>`](<#/doc/io/basic_istream/operator_gtgt2>) se elas falharem ao extrair quaisquer caracteres. 
  * A sobrecarga de streambuf de [`basic_istream::operator>>`](<#/doc/io/basic_istream/operator_gtgt>) se o argumento streambuf for um ponteiro nulo ou se nenhum caractere foi inserido no streambuf. 
  * A sobrecarga de streambuf de [`basic_ostream::operator<<`](<#/doc/io/basic_ostream/operator_ltlt>) se a função não inserir nenhum caractere. 
  * [`operator>>(std::bitset<>)`](<#/doc/utility/bitset/operator_ltltgtgt2>) se a função não extrair nenhum caractere do stream de entrada. 
  * [std::getline](<#/doc/string/basic_string/getline>) se a função não extrair nenhum caractere ou se conseguir extrair [`basic_string::max_size`](<#/doc/string/basic_string/max_size>) caracteres do stream de entrada. 
  * As sobrecargas de entrada numérica, de ponteiro e booleana de [`basic_istream::operator>>`](<#/doc/io/basic_istream/operator_gtgt>) (tecnicamente, as sobrecargas de [`num_get::get`](<#/doc/locale/num_get/get>) que elas chamam), se a entrada não puder ser analisada como um valor válido ou se o valor analisado não couber no tipo de destino. 
  * O manipulador de entrada de tempo [std::get_time](<#/doc/io/manip/get_time>) (tecnicamente, [`time_get::get`](<#/doc/locale/time_get/get>) que ele chama), se a entrada não puder ser analisada de forma inequívoca como um valor de tempo de acordo com a string de formato fornecida. 
  * O manipulador de entrada de moeda [std::get_money](<#/doc/io/manip/get_money>) (tecnicamente, [`money_get::get`](<#/doc/locale/money_get/get>) que ele chama), se a entrada não puder ser analisada de forma inequívoca como um valor monetário de acordo com as regras de locale. 
  * Os operadores de extração de todos os [RandomNumberEngines](<#/doc/named_req/RandomNumberEngine>), se uma entrada inválida for encontrada. 
  * Os operadores de extração de todas as [RandomNumberDistributions](<#/doc/named_req/RandomNumberDistribution>), se uma entrada inválida for encontrada. 
  * As funções de entrada não formatada [`basic_istream::get`](<#/doc/io/basic_istream/get>) se elas falharem ao extrair quaisquer caracteres. 
  * [`basic_istream::getline`](<#/doc/io/basic_istream/getline>), se não extrair nenhum caractere, se preencher o buffer fornecido sem encontrar o delimitador, ou se o tamanho do buffer fornecido for menor que 1. 
  * [`basic_istream::read`](<#/doc/io/basic_istream/read>), se a condição de fim de arquivo ocorrer no stream de entrada antes que todos os caracteres solicitados pudessem ser extraídos. 
  * [`basic_istream::seekg`](<#/doc/io/basic_istream/seekg>) em caso de falha 
  * [`basic_ostream::tellp`](<#/doc/io/basic_ostream/tellp>) em caso de falha 
  * Os construtores de [std::basic_fstream](<#/doc/io/basic_fstream>), [std::basic_ifstream](<#/doc/io/basic_ifstream>), e [std::basic_ofstream](<#/doc/io/basic_ofstream>) que recebem um argumento de nome de arquivo, se o arquivo não puder ser aberto. 
  * [`basic_fstream::open`](<#/doc/io/basic_fstream/open>), [`basic_ifstream::open`](<#/doc/io/basic_ifstream/open>), e [`basic_ofstream::open`](<#/doc/io/basic_ofstream/open>) se o arquivo não puder ser aberto. 
  * [`basic_fstream::close`](<#/doc/io/basic_fstream/close>), [`basic_ifstream::close`](<#/doc/io/basic_ifstream/close>), e [`basic_ofstream::close`](<#/doc/io/basic_ofstream/close>) se o arquivo não puder ser fechado. 

#### O badbit

O badbit é definido pelas seguintes funções da standard library: 

  * [`basic_ostream::put`](<#/doc/io/basic_ostream/put>) se falhar ao inserir um caractere no stream de saída, por qualquer motivo. 
  * [`basic_ostream::write`](<#/doc/io/basic_ostream/write>) se falhar ao inserir um caractere no stream de saída, por qualquer motivo. 
  * Funções de saída formatada [operator<<](<#/doc/io/basic_ostream/operator_ltlt>), [std::put_money](<#/doc/io/manip/put_money>), e [std::put_time](<#/doc/io/manip/put_time>), se encontrarem o fim do stream de saída antes de completar a saída. 
  * [`basic_ios::init`](<#/doc/io/basic_ios/init>) quando chamada para inicializar um stream com um ponteiro nulo para `rdbuf()`. 
  * [`basic_istream::putback`](<#/doc/io/basic_istream/putback>) e [`basic_istream::unget`](<#/doc/io/basic_istream/unget>) quando chamadas em um stream com um `rdbuf()` nulo. 
  * [`basic_ostream::operator<<(basic_streambuf*)`](<#/doc/io/basic_ostream/operator_ltlt>) quando um ponteiro nulo é passado como argumento. 
  * [`basic_istream::putback`](<#/doc/io/basic_istream/putback>) e [`basic_istream::unget`](<#/doc/io/basic_istream/unget>) se rdbuf()->sputbackc() ou rdbuf()->sungetc() retornarem traits::eof(). 
  * [`basic_istream::sync`](<#/doc/io/basic_istream/sync>), [`basic_ostream::flush`](<#/doc/io/basic_ostream/flush>), e cada função de saída em um stream de saída `unitbuf`, se rdbuf()->pubsync() retornar -1. 
  * Cada função de E/S de stream se uma exceção for lançada por qualquer função membro do buffer de stream associado (por exemplo, `sbumpc()`, `xsputn()`, `sgetc()`, `overflow()`, etc). 
  * [`ios_base::iword`](<#/doc/io/ios_base/iword>) e [`ios_base::pword`](<#/doc/io/ios_base/pword>) em caso de falha (por exemplo, falha ao alocar memória). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

A tabela a seguir mostra o valor dos acessadores de [`basic_ios`](<#/doc/io/basic_ios>) ([`good()`](<#/doc/io/basic_ios/good>), [`fail()`](<#/doc/io/basic_ios/fail>), etc.) para todas as combinações possíveis de flags `ios_base::iostate`: 

Flags de `ios_base::iostate`  |  Acessadores de `basic_ios`   
---|---|---|---|---|---|---|---|---
`eofbit` |  `failbit` |  `badbit` |  [`good()`](<#/doc/io/basic_ios/good>) |  [`fail()`](<#/doc/io/basic_ios/fail>) |  [`bad()`](<#/doc/io/basic_ios/bad>) |  [`eof()`](<#/doc/io/basic_ios/eof>) |  [`operator bool`](<#/doc/io/basic_ios/operator_bool>) |  [`operator!`](<#/>)  
false  |  false  |  false  | true  |  false  |  false  |  false  | true  |  false   
false  |  false  | true  |  false  | true  | true  |  false  |  false  | true   
false  | true  |  false  |  false  | true  |  false  |  false  |  false  | true   
false  | true  | true  |  false  | true  | true  |  false  |  false  | true   
true  |  false  |  false  |  false  |  false  |  false  | true  | true  |  false   
true  |  false  | true  |  false  | true  | true  | true  |  false  | true   
true  | true  |  false  |  false  | true  |  false  | true  |  false  | true   
true  | true  | true  |  false  | true  | true  | true  |  false  | true   
[ rdstate](<#/doc/io/basic_ios/rdstate>) |  retorna flags de estado   
(função membro pública de `std::basic_ios<CharT,Traits>`)  
[ setstate](<#/doc/io/basic_ios/setstate>) |  define flags de estado   
(função membro pública de `std::basic_ios<CharT,Traits>`)  
[ clear](<#/doc/io/basic_ios/clear>) |  modifica flags de estado   
(função membro pública de `std::basic_ios<CharT,Traits>`)