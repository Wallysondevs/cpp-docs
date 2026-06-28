# Requisitos nomeados C++: FormattedInputFunction

### Requisitos

Uma FormattedInputFunction é uma função de entrada de stream que executa o seguinte:

* Constrói um objeto do tipo [`basic_istream::sentry`](<#/doc/io/basic_istream/sentry>) com duração de armazenamento automática e com o argumento `noskipws` definido como false, que executa o seguinte:

* se [`eofbit`](<#/doc/io/ios_base/iostate>) ou [`badbit`](<#/doc/io/ios_base/iostate>) estiverem definidos no stream de entrada, define o `failbit` também, e se as exceções em `failbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream de entrada ((exceptions() & failbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
* descarrega (flushes) o stream de saída associado por tie(), se aplicável.
* se a flag `ios_base::skipws` estiver definida neste stream de entrada, extrai e descarta caracteres do stream de entrada até que uma das seguintes condições se torne verdadeira:

* o próximo caractere disponível no stream de entrada não é um caractere de espaço em branco, conforme testado pela facet [std::ctype](<#/doc/locale/ctype>) da locale atualmente imbuída neste stream de entrada. O caractere não-espaço em branco não é extraído.
* o fim do stream é alcançado, caso em que `failbit` e `eofbit` são definidos e se o stream estiver configurado para exceções em um desses bits, [`ios_base::failure`](<#/doc/io/ios_base/failure>) é lançada.

* Verifica o status do sentry chamando `sentry::operator bool()`, que é equivalente a [`basic_ios::good`](<#/doc/io/basic_ios/good>).
* Se o sentry retornou false ou o construtor do sentry lançou uma exceção, nenhuma entrada ocorre.
* Se o sentry retornou true, executa a entrada como se chamasse rdbuf()->sbumpc() ou rdbuf()->sgetc().

* se o fim do stream for alcançado (a chamada para rdbuf()->sbumpc() ou rdbuf()->sgetc() retorna Traits::eof()), define `eofbit`. Se as exceções em `eofbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream ((exceptions() & eofbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
* se uma exceção for lançada durante a entrada, define `badbit` no stream de entrada. Se as exceções em `badbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste stream ((exceptions() & badbit) != 0), a exceção também é relançada.
* Se nenhuma exceção foi lançada, retorna *this.

* Em qualquer caso, seja terminando por exceção ou retornando, o destrutor do sentry é chamado antes de sair desta função.

### Biblioteca padrão

As seguintes funções da biblioteca padrão são **FormattedInputFunction s**.

* [`basic_istream::operator>>(int, long, double, void*, bool)`](<#/doc/io/basic_istream/operator_gtgt>)
* [`operator>>(std::basic_istream, char&)`](<#/doc/io/basic_istream/operator_gtgt2>)
* [`operator>>(std::basic_istream, char*)`](<#/doc/io/basic_istream/operator_gtgt2>)
* [`operator>>(std::basic_istream, std::bitset)`](<#/doc/utility/bitset/operator_ltltgtgt2>)
* [`operator>>(std::basic_istream, std::string)`](<#/doc/string/basic_string/operator_ltltgtgt>)
* `operator>>`, quando chamado no valor de retorno de [std::get_money](<#/doc/io/manip/get_money>)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 160](<https://cplusplus.github.io/LWG/issue160>) | C++98 | o processo de determinar se a exceção capturada
é relançada mencionava uma função `exception()` não existente | corrigido para [`exceptions()`](<#/doc/io/basic_ios/exceptions>)
*[_(as is)_]: A::pointer